import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import { AtcpSongLinksService, LinkSection } from './atcp-song-links.service';

@Component({
  selector: 'app-atcp-song-links',
  standalone: true,
  imports: [CommonModule, Navbar, Footer],
  templateUrl: './atcp-song-links.html',
  styleUrls: ['./atcp-song-links.css']
})
export class AtcpSongLinks implements OnInit {
  private readonly service = inject(AtcpSongLinksService);

  sections = signal<LinkSection[]>([]);

  ngOnInit(): void {
    this.service.getSections().subscribe({
      next: (data) => this.sections.set(data),
      error: (err) => console.error('Failed to load song links:', err)
    });
  }
}

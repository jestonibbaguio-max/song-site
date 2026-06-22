import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Person } from '../models/atcp-song.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  readonly songLead = input.required<Person>();
  readonly regionalLeads = input<Person[]>([]);

  onImgError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/images/placeholder.svg';
  }
}

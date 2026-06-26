// src/app/atcp-song/atcp-song.ts
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtcpSongService } from './services/atcp-song.service';
import { AtcpSongData } from './models/atcp-song.model';
/* ── Import the three child components ── */
import { Header } from './header/header';
import { OfferingsTable } from './offerings-table/offerings-table';
import { EnablementChampions } from './enablement-champions/enablement-champions';
import { Navbar } from '../navbar/navbar';
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-atcp-song',
  standalone: true,
  imports: [
    CommonModule,
    Navbar,
    Footer,
    Header, 
    OfferingsTable,      /* fixes: 'app-offerings-table' is not a known element */
    EnablementChampions  /* fixes: 'app-enablement-champions' is not a known element */
  ],
  templateUrl: './atcp-song.html',
  styleUrl: './atcp-song.css'
})
export class AtcpSong implements OnInit {
  private readonly atcpSongService = inject(AtcpSongService);

  /* signals — fixes TS2339: Property 'loading' / 'error' / 'data' does not exist */
  readonly loading = signal(true);
  readonly error   = signal<string | null>(null);
  readonly data    = signal<AtcpSongData | null>(null);

  ngOnInit(): void {
    this.atcpSongService.getData().subscribe({
      next: (result) => {
        this.data.set(result);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load ATCP SONG data:', err);
        this.error.set('Could not load data. Please check assets/data/atcp-song.json.');
        this.loading.set(false);
      }
    });
  }
}

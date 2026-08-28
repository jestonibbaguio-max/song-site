import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketLead } from '../models/atcp-song.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  readonly marketLeads = input.required<MarketLead[]>();

  onImgError(event: Event, initials: string): void {
    const img = event.target as HTMLImageElement;
    if (img.parentElement) {
      img.parentElement.innerHTML = initials;
    }
  }
}

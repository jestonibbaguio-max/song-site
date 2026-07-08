import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnablementChampion } from '../models/atcp-song.model';

@Component({
  selector: 'app-enablement-champions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './enablement-champions.html',
  styleUrl: './enablement-champions.css'
})
export class EnablementChampions {
  readonly champions = input<EnablementChampion[]>([]);

  onImgError(event: Event, initials: string): void {
    const img = event.target as HTMLImageElement;
    if (img.parentElement) {
      img.parentElement.innerHTML = initials;
    }
  }
}

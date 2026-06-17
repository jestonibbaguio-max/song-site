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
}


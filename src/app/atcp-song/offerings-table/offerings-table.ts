import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Offering } from '../models/atcp-song.model';

@Component({
  selector: 'app-offerings-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './offerings-table.html',
  styleUrl: './offerings-table.css'
})
export class OfferingsTable {
  readonly offerings = input<Offering[]>([]);

  readonly gridColumns = computed(() =>
    `180px repeat(${this.offerings().length}, 1fr)`
  );
}

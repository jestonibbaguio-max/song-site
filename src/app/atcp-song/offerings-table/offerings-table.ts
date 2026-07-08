import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PracticeLead, CapabilityLead } from '../models/atcp-song.model';

@Component({
  selector: 'app-offerings-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './offerings-table.html',
  styleUrl: './offerings-table.css'
})
export class OfferingsTable {
  readonly practiceLeads = input<PracticeLead[]>([]);
  readonly capabilityLeads = input<CapabilityLead[]>([]);

  onImgError(event: Event, initials: string): void {
    const img = event.target as HTMLImageElement;
    if (img.parentElement) {
      img.parentElement.innerHTML = initials;
    }
  }

  capNamesHtml(cap: CapabilityLead): string {
    return cap.groups
      .map(g => {
        const names = g.members.map(m => m.name).join(' / ');
        return g.subcategory ? `${names} (${g.subcategory})` : names;
      })
      .join('<br>');
  }
}

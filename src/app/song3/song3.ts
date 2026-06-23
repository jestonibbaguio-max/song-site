import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../navbar/navbar';
import { Footer } from "../footer/footer";

type TechCard = {
  id: number;
  group: string;     // "Group 1" .. "Group 6"
  title: string;     // Tech name
  logos: string[];   // images
};

type GroupSection = {
  key: string;          // "Group 1"
  header: string;       // "React.js" / "Mobile Technologies" etc.
  items: TechCard[];    // all tech cards under this group
  area: string;         // CSS grid area name
};

@Component({
  selector: 'app-song3',
  standalone: true,
  imports: [Navbar, CommonModule, Footer],
  templateUrl: './song3.html',
  styleUrl: './song3.css'
})
export class Song3 {



  // ✅ Your exact requested flat data structure
  cards: TechCard[] = [
    { id: 1, group: 'Group 1', title: 'React.js', logos: ['/assets/icons/technologies/react.png'] },

    { id: 2, group: 'Group 2', title: 'Magento', logos: ['/assets/icons/technologies/magento.png'] },
    { id: 3, group: 'Group 2', title: 'Hybris', logos: ['/assets/icons/technologies/hybris.png'] },
    { id: 4, group: 'Group 2', title: 'SFCC', logos: ['/assets/icons/technologies/salesforce.png'] },

    { id: 5, group: 'Group 3', title: 'UI/UX', logos: ['/assets/icons/technologies/uiux.png'] },

    { id: 6, group: 'Group 4', title: 'iOS', logos: ['/assets/icons/technologies/ios.png'] },
    { id: 7, group: 'Group 4', title: 'Android', logos: ['/assets/icons/technologies/android.png'] },
    { id: 8, group: 'Group 4', title: 'Ionic', logos: ['/assets/icons/technologies/ionic.png'] },
    { id: 9, group: 'Group 4', title: 'React', logos: ['/assets/icons/technologies/react.png'] },
    { id: 10, group: 'Group 4', title: 'Flutter', logos: ['/assets/icons/technologies/flutter.png'] },

    { id: 11, group: 'Group 5', title: 'Angular', logos: ['/assets/icons/technologies/angular.png'] },
    { id: 12, group: 'Group 5', title: 'AEM', logos: ['/assets/icons/technologies/aem.png'] },

    { id: 13, group: 'Group 6', title: 'Contractors', logos: ['/assets/icons/technologies/contractors.png'] }
  ];

  // ✅ This defines the EXACT 2-row layout areas like the screenshot
  // Row 1: g1, g2, g3
  // Row 2: g4 (wide), g5, g6
  groupLayout: Omit<GroupSection, 'items'>[] = [
    { key: 'Group 1', header: 'React.js', area: 'g1' },
    { key: 'Group 2', header: 'Magento | SFCC | Hybris ', area: 'g2' },
    { key: 'Group 3', header: 'UI/UX', area: 'g3' },
    { key: 'Group 4', header: 'Mobile Technologies', area: 'g4' },
    { key: 'Group 5', header: 'Angular | AEM', area: 'g5' },
    { key: 'Group 6', header: 'Contractors', area: 'g6' }
  ];

  // ✅ Combine layout + items
  get sections(): GroupSection[] {
    return this.groupLayout.map(gl => ({
      ...gl,
      items: this.cards.filter(c => c.group === gl.key)
    }));
  }
}
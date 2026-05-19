import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Navbar } from '../../../navbar/navbar';

@Component({
 selector: 'app-cv',
 standalone: true,
 imports: [CommonModule, Navbar],
 templateUrl: './cv.html',
 styleUrl: './cv.css'
})
export class Cv {

 constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/journey']);
  }

  isWaiting = false;
  
markCompleted() {
 const data = localStorage.getItem('items');
 let items: any[] = [];
 if (data) {
   items = JSON.parse(data);
 }
 const track = items.find((i: any) => i.label === 'Create CV');
 const now = new Date().toISOString();
 // ✅ ONLY update status if allowed
 if (track && (track.status === 'In Progress' || track.status === 'Blocked')) {
   track.status = 'Completed';
   track.endDate = now;
   track.lastUpdated = now;
   localStorage.setItem('items', JSON.stringify(items));
 }
 // ✅ ALWAYS navigate (regardless of status)
 setTimeout(() => {
   this.router.navigate(['/journey']);
 }, 5000);
}
}

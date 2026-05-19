import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
 selector: 'app-track2',
 standalone: true,
 imports: [CommonModule],
 templateUrl: './track2.html',
 styleUrl: './track2.css'
})
export class Track2 {

 constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }

  isWaiting = false;
  
 // ✅ Button function
 markCompleted() {
  this.isWaiting = true;
   const data = localStorage.getItem('items');
   if (!data) return;

   const items = JSON.parse(data);
   const track = items.find((i: any) => i.label === 'ATCP Song Skills Matrix');
   if (!track) return;

   const now = new Date().toISOString();

   setTimeout(() => {
     track.status = 'Completed';
     track.endDate = now;
     track.lastUpdated = now;
     
     localStorage.setItem('items', JSON.stringify(items));
     this.isWaiting = false;
     this.router.navigate(['/journey']);
   }, 5000);
 }
}

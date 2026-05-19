import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({

  selector: 'app-skills-matrix',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills-matrix.html',
  styleUrls: ['./skills-matrix.css']

})

export class SkillsMatrix implements OnInit {

  isWaiting = false;
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/journey']);
  }

  markCompleted() {
    const data = localStorage.getItem('items');
    let items: any[] = [];
    if (data) {
    items = JSON.parse(data);
    }
    const track = items.find((i: any) => i.label === 'ATCP Song Skills Matrix');
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

  ngOnInit() {}

}
 
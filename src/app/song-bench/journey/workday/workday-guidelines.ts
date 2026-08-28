import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-workday-guidelines',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workday-guidelines.html',
  styleUrls: ['./workday-guidelines.css']
})
export class WorkdayGuidelines {
  isMarked = false;

  steps = [
    'Open the Workday Priorities section.',
    'Review all active priorities and identify any needed updates.',
    'Update the priority details clearly and accurately.',
    'Save the changes inside Workday.',
    'Confirm the Update Priorities section is complete.'
  ];

  markSectionComplete(): void {
    this.isMarked = true;
    const raw = localStorage.getItem('workdayTask');
    const data = raw ? JSON.parse(raw) : {};
    const now = new Date().toISOString();
    localStorage.setItem(
      'workdayTask',
      JSON.stringify({
        ...data,
        status: data.status || 'In Progress',
        startDate: data.startDate || now,
        sectionComplete: true,
        sectionCompletedAt: now
      })
    );
  }
}

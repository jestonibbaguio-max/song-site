import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Navbar } from '../../../navbar/navbar';

interface WorkdayTask {
  status: 'Not Started' | 'In Progress' | 'Completed';
  startDate?: string;
  endDate?: string;
  lastUpdated?: string;
}

@Component({
  selector: 'app-workday',
  standalone: true,
  imports: [CommonModule, Navbar],
  templateUrl: './workday.html',
  styleUrls: ['./workday.css']
})
export class Workday implements OnInit, OnDestroy {
  status: 'Not Started' | 'In Progress' | 'Completed' = 'Not Started';
  startDate?: string;
  endDate?: string;
  lastUpdated?: string;

  guidelines = [
    'Open Workday and navigate to the Priorities section.',
    'Review your active priorities.',
    'Update priority details clearly and accurately.',
    'Save all changes in Workday.',
    'Confirm the task is now marked complete.'
  ];

  private boundStorageHandler = this.onStorageEvent.bind(this);

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadState();
    window.addEventListener('storage', this.boundStorageHandler);
  }

  ngOnDestroy() {
    window.removeEventListener('storage', this.boundStorageHandler);
  }

  get statusLabel(): string {
    return this.status;
  }

  loadState(): void {
    const raw = localStorage.getItem('workdayTask');
    if (!raw) {
      this.status = 'Not Started';
      return;
    }

    try {
      const saved: WorkdayTask = JSON.parse(raw);
      this.status = saved.status || 'Not Started';
      this.startDate = saved.startDate;
      this.endDate = saved.endDate;
      this.lastUpdated = saved.lastUpdated;
    } catch {
      this.status = 'Not Started';
    }
  }

  saveState(): void {
    const payload: WorkdayTask = {
      status: this.status,
      startDate: this.startDate,
      endDate: this.endDate,
      lastUpdated: this.lastUpdated
    };
    localStorage.setItem('workdayTask', JSON.stringify(payload));
  }

  markCompleted(): void {
    if (this.status === 'Not Started') {
      this.startDate = new Date().toISOString();
    }

    this.status = 'Completed';
    this.endDate = new Date().toISOString();
    this.lastUpdated = new Date().toISOString();
    this.saveState();
    this.updateWorkdayItemInJourney();

    setTimeout(() => {
      this.router.navigate(['/my-journey']);
    }, 500);
  }

  private updateWorkdayItemInJourney(): void {
    const itemsRaw = localStorage.getItem('items');
    if (!itemsRaw) return;

    try {
      const items = JSON.parse(itemsRaw);
      const workdayItem = items.find((item: any) => item.label === 'Workday');
      if (workdayItem) {
        workdayItem.status = this.status;
        workdayItem.startDate = this.startDate;
        workdayItem.endDate = this.endDate;
        workdayItem.lastUpdated = this.lastUpdated;
        localStorage.setItem('items', JSON.stringify(items));
      }
    } catch {
      // silently fail
    }
  }

  onStorageEvent(event: StorageEvent): void {
    if (event.key === 'workdayTask') {
      this.loadState();
    }
  }
}

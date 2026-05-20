import { Component, Input } from '@angular/core';
import { Task } from '../models/task';
import { TaskService } from '../task.service';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
 
@Component({
  selector: 'app-task-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-grid.html',
  styleUrls: ['./task-grid.css']
})
export class TaskGrid {
  @Input() tasks: Task[] = [];
 
  constructor(private taskService: TaskService, private router: Router) {}
 
  goToTask(url: string) {
    this.router.navigate([url]);
  }

  startTask(task: Task, event?: Event) {
    event?.stopPropagation();

    this.taskService.updateTaskStatus(task.id, 'start').subscribe(() => {
      this.router.navigate([task.url]);
      // window.location.reload();   // refresh page after update
    });
  }
 
  completeTask(task: Task, event?: Event) {
    event?.stopPropagation();
    
    this.taskService.updateTaskStatus(task.id, 'complete').subscribe(() => {
      window.location.reload();   // refresh page after update
    });
  }
 
  getProgress(status: string): number {
    switch (status) {
      case 'In Progress':
        return 50;
      case 'Completed':
        return 100;
      default:
        return 0;
    }
  }

  getProgressColor(status: string): string {
    switch (status) {
      case 'Complete':
        return '#22c55e';
      case 'In Progress':
        return '#f59e0b';
      default:
        return '#22c55e';
    }
  }
}

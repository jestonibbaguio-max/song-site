import { Component, Input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task';

type StatusKey = 'completed' | 'inprogress' | 'pending' | 'notstarted';

@Component({
  selector: 'app-task-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-summary.html',
  styleUrls: ['./task-summary.css']
})
export class TaskSummary {
  @Input() tasks: Task[] = [];   // plain input

  // internal signal derived from input
  tasksSignal = signal<Task[]>([]);

  counts = computed<Record<StatusKey, number>>(() => ({
    completed: this.tasksSignal().filter(t => t.status === 'Completed').length,
    inprogress: this.tasksSignal().filter(t => t.status === 'In Progress').length,
    pending: this.tasksSignal().filter(t => t.status === 'Pending').length,
    notstarted: this.tasksSignal().filter(t => t.status === 'Not Started').length
  }));

  summaryItems: { key: StatusKey; label: string; color: string }[] = [
    { key: 'completed', label: 'Completed', color: '#63B750' },
    { key: 'inprogress', label: 'In Progress', color: '#f59e0b' },
    // { key: 'pending', label: 'Pending', color: '#FFA500' },
    { key: 'notstarted', label: 'Not Started', color: '#9E9E9E' }
  ];

  ngOnChanges() {
    this.tasksSignal.set(this.tasks);
  }
}

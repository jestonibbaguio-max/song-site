import { Component, Input, TemplateRef } from '@angular/core';
import { TrainingTask } from '../models/training-task';
import { TrainingTaskService } from '../training-task.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-grid.html',
  styleUrls: ['./task-grid.css']
})
export class TaskGrid {
  @Input() tasks: TrainingTask[] = [];
  selectedTask: any;

  constructor(private taskService: TrainingTaskService, private router: Router, private modalService: NgbModal) {}

  openCompleteModal(content: TemplateRef<any>, task: any) {
    event?.stopPropagation();
    this.selectedTask = task;
    this.modalService.open(content, { windowClass: 'top-center-modal' });
  }

  confirmComplete(modal: any, event: Event) {
    event?.stopPropagation();
    this.completeTask(this.selectedTask, event);
    modal.close();
  }

  goToTask(url: string) {
    window.open(url, '_blank');
  }

  startTask(task: TrainingTask, event?: Event) {
    event?.stopPropagation();
    this.taskService.updateTaskStatus(task.id, 'start').subscribe(() => {
      window.open(task.url, '_blank');
      window.location.reload();
    });
  }

  completeTask(task: TrainingTask, event?: Event) {
    event?.stopPropagation();
    this.taskService.updateTaskStatus(task.id, 'complete').subscribe(() => {
      window.location.reload();
    });
  }

  getProgress(status: string): number {
    switch (status) {
      case 'In Progress': return 50;
      case 'Completed': return 100;
      default: return 0;
    }
  }

  getProgressColor(status: string): string {
    switch (status) {
      case 'Completed': return '#22c55e';
      case 'In Progress': return '#f59e0b';
      default: return '#22c55e';
    }
  }

  getTrainingStatus(status: string): string {
    switch (status) {
      case 'In Progress':
        return "inprogress";
      case 'Completed':
        return "completed";
      default:
        return "notstarted";
    }
  }
}

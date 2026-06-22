import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { TrainingTask } from '../models/training-task';
import { TrainingTaskService } from '../training-task.service';
import { TaskService } from '../../my-journey/task.service';
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
  @Output() tasksChanged = new EventEmitter<void>();
  selectedTask: any;

  // ID of the "Complete all Training trackers" card in my-journey tasks
  private readonly mainTrainingTaskId = 12;

  constructor(
    private taskService: TrainingTaskService,
    private mainTaskService: TaskService,
    private router: Router,
    private modalService: NgbModal
  ) {}

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
      this.tasksChanged.emit();
    });
  }

  completeTask(task: TrainingTask, event?: Event) {
    event?.stopPropagation();
    this.taskService.updateTaskStatus(task.id, 'complete').subscribe(() => {
      this.tasksChanged.emit();
    });
  }

  updateTask(task: TrainingTask, event?: Event) {
    event?.stopPropagation();
    // Revert this training task back to In Progress
    this.taskService.updateTaskStatus(task.id, 'start').subscribe(() => {
      // If the parent "Complete all Training trackers" card was Completed,
      // also revert it to In Progress since not all trainings are done anymore
      this.mainTaskService.getTasks().subscribe(mainTasks => {
        const mainTask = mainTasks.find(t => t.id === this.mainTrainingTaskId);
        if (mainTask?.status === 'Completed') {
          this.mainTaskService.updateTaskStatus(this.mainTrainingTaskId, 'start').subscribe(() => {
            this.tasksChanged.emit();
          });
        } else {
          this.tasksChanged.emit();
        }
      });
    });
  }

  getTrainingStatus(status: string): string {
    switch (status) {
      case 'In Progress': return 'inprogress';
      case 'Completed': return 'completed';
      default: return 'notstarted';
    }
  }

  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins} min`;
    return `${hours} hr ${mins} min`;
  }
}

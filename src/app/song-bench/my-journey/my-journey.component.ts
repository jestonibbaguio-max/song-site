import { CommonModule } from "@angular/common";
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { forkJoin } from "rxjs";
import { TaskGrid } from "./task-grid/task-grid";

import { Task } from "./models/task";
import { TaskService } from "./task.service";
import { Navbar } from "../../navbar/navbar";

const TRAINING_TRACKER_TASK_ID = 12;

@Component({
 standalone: true,
 imports: [CommonModule, TaskGrid, Navbar],
 templateUrl: './my-journey.component.html',
 styleUrl: './my-journey.component.css'
})
export class MyJourneyComponent implements OnInit {

  tasks: Task[] = [];
  allTrainingCompleted = false;

  constructor(
    private taskService: TaskService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    forkJoin({
      tasks: this.taskService.getTasks(),
      trainingTasks: this.taskService.getTrainingTasks()
    }).subscribe(({ tasks, trainingTasks }) => {
      this.allTrainingCompleted = trainingTasks.every(t => t.status === 'Completed');

      // If any training task is In Progress, ensure the main card is also In Progress
      const anyInProgress = trainingTasks.some(t => t.status === 'In Progress');
      const mainTask = tasks.find(t => t.id === TRAINING_TRACKER_TASK_ID);

      if (anyInProgress && mainTask && mainTask.status !== 'In Progress') {
        this.taskService.updateTaskStatus(TRAINING_TRACKER_TASK_ID, 'start').subscribe(() => {
          this.taskService.getTasks().subscribe(updated => {
            this.tasks = updated;
            this.cdr.detectChanges();
          });
        });
      } else {
        this.tasks = tasks;
        this.cdr.detectChanges();
      }
    });
  }

  getCompletedCount(): number {
    return this.tasks.filter(task => task.status === 'Completed').length;
  }
}

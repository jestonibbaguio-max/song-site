import { CommonModule } from "@angular/common";
import { Component, ChangeDetectorRef } from "@angular/core";
import { TaskGrid } from "./task-grid/task-grid";
import { TrainingTask } from "./models/training-task";
import { TrainingTaskService } from "./training-task.service";
import { Navbar } from "../../navbar/navbar";
import { Footer } from "../../footer/footer";

@Component({
  standalone: true,
  imports: [CommonModule, TaskGrid, Navbar, Footer],
  templateUrl: './training-tracker.html',
  styleUrls: ['./training-tracker.css']
})
export class TrainingTracker {

  tasks: TrainingTask[] = [];

  constructor(private taskService: TrainingTaskService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
      this.cdr.detectChanges();
    });
  }

  getCompletedCount(): number {
    return this.tasks.filter(
      task => task.status === 'Completed'
    ).length;
  }
}

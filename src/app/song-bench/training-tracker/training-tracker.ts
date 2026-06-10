import { CommonModule } from "@angular/common";
import { Component, ChangeDetectorRef } from "@angular/core";
import { TaskGrid } from "./task-grid/task-grid";
import { TrainingTask } from "./models/training-task";
import { TrainingTaskService } from "./training-task.service";
import { Navbar } from "../../navbar/navbar";

@Component({
  standalone: true,
  imports: [CommonModule, TaskGrid, Navbar],
  templateUrl: './training-tracker.html',
  styleUrls: ['./training-tracker.css']
})
export class TrainingTracker {

  tasks: TrainingTask[] = [];

  constructor(private taskService: TrainingTaskService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
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

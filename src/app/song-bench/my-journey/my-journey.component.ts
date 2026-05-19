import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { TaskGrid } from "./task-grid/task-grid";
import { TaskSummary } from "./components/task-summary/task-summary";
import { PathProgress } from "./components/path-progress/path-progress";
import { ChangeDetectorRef } from "@angular/core";

import { Task } from "./models/task";
import { TaskService } from "./task.service";
import { Navbar } from "../../navbar/navbar";

@Component({
 standalone: true,
 imports: [CommonModule, TaskGrid, PathProgress, TaskSummary, Navbar],
 templateUrl: './my-journey.component.html'
})
export class MyJourneyComponent {

  tasks: Task[] = [];

  constructor(private taskService: TaskService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
      this.cdr.detectChanges();
    });
  }
}

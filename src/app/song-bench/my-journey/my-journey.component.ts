import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { TaskGrid } from "./task-grid/task-grid";
import { ChangeDetectorRef } from "@angular/core";

import { Task } from "./models/task";
import { TaskService } from "./task.service";
import { Navbar } from "../../navbar/navbar";

@Component({
 standalone: true,
 imports: [CommonModule, TaskGrid, Navbar],
 templateUrl: './my-journey.component.html',
 styleUrl: './my-journey.component.css'
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

  getCompletedCount(): number {
  return this.tasks.filter(
    task => task.status === 'Completed'
  ).length;
  }
}

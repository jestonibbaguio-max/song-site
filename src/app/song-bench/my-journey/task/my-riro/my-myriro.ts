import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../task.service';
import { Navbar } from '../../../../navbar/navbar';
import { Footer } from "../../../../footer/footer";

@Component({

  selector: 'app-my-myriro',
  standalone: true,
  imports: [CommonModule, Navbar, Footer],
  templateUrl: './my-myriro.html',
  styleUrls: ['./my-riro.css']

})

export class MyMyRiro implements OnInit {


  isCompleted = false;
  private readonly taskId = 6;

  constructor(private router: Router, private taskService: TaskService) {}

    ngOnInit() {
    const task = history.state?.task;
    if (task) {
      this.isCompleted = task.status === 'Completed';
    } else {
      this.taskService.getTasks().subscribe(tasks => {
        this.isCompleted = tasks.find(t => t.id === this.taskId)?.status === 'Completed';
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/my-journey']);
  }

     updateTask() {
    this.isCompleted = false;
    this.taskService.updateTaskStatus(this.taskId, 'start').subscribe();
  }

}
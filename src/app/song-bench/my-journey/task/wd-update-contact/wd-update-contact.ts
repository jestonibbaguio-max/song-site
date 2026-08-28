
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Footer } from "../../../../footer/footer";
import { Navbar } from '../../../../navbar/navbar';
import { TaskService } from '../../task.service';

@Component({
	selector: 'app-wd-update-contact',
	standalone: true,
	imports: [CommonModule, Navbar, Footer],
	templateUrl: './wd-update-contact.html',
	styleUrl: './wd-update-contact.css',
})

export class WDUpdateContact implements OnInit {
	isCompleted = false;
	private readonly taskId = 10;

	constructor(private router: Router, private taskService: TaskService) {}

	goBack() {
		this.router.navigate(['/my-journey']);
	}

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

	updateTask() {
		this.isCompleted = false;
		this.taskService.updateTaskStatus(this.taskId, 'start').subscribe();
	}
}

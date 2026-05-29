import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Navbar } from '../../../../navbar/navbar';

@Component({
  selector: 'app-my-learning-platform',
  standalone: true,
  imports: [CommonModule, Navbar],
  templateUrl: './my-learning-platform.html',
  styleUrl: './my-learning-platform.css',
})

export class MyLearningPlatform implements OnInit {
	isWaiting = false;
	constructor(private router: Router) {}

	goBack() {
		this.router.navigate(['/my-journey']);
	}

	markCompleted() {
		const data = localStorage.getItem('items');
		let items: any[] = [];

		if (data) {
			items = JSON.parse(data);
		}

		const track = items.find((i: any) => i.label === 'Learning Platform');
		const now = new Date().toISOString();
		if (track && (track.status === 'In Progress' || track.status === 'Blocked')) {
			track.status = 'Completed';
			track.endDate = now;
			track.lastUpdated = now;
			localStorage.setItem('items', JSON.stringify(items));
		}
		setTimeout(() => {
			this.router.navigate(['/my-journey']);
		}, 5000);
	}

	ngOnInit() {}
}

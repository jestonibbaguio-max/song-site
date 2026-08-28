import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Navbar } from '../../../navbar/navbar';

@Component({
	selector: 'app-update-contact',
	standalone: true,
	imports: [CommonModule, Navbar],
	templateUrl: './update-contact.html',
	styleUrl: './update-contact.css',
})

export class UpdateContact implements OnInit {
	isWaiting = false;
	constructor(private router: Router) {}

	goBack() {
		this.router.navigate(['/journey']);
	}

	markCompleted() {
		const data = localStorage.getItem('items');
		let items: any[] = [];

		if (data) {
			items = JSON.parse(data);
		}

		const track = items.find((i: any) => i.label === 'Update Contact');
		const now = new Date().toISOString();
		// ✅ ONLY update status if allowed
		if (track && (track.status === 'In Progress' || track.status === 'Blocked')) {
			track.status = 'Completed';
			track.endDate = now;
			track.lastUpdated = now;
			localStorage.setItem('items', JSON.stringify(items));
		}
		// ✅ ALWAYS navigate (regardless of status)
		setTimeout(() => {
			this.router.navigate(['/journey']);
		}, 5000);
	}

	ngOnInit() {}
}

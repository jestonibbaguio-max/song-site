import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardService, RbacUser } from './dashboard.service';

@Component({ selector: 'app-admin-users', standalone: true, imports: [CommonModule, RouterModule], templateUrl: './admin-users.component.html', styleUrl: './admin-users.component.css' })
export class AdminUsersComponent implements OnInit {
  private readonly service = inject(DashboardService);
  readonly users = signal<RbacUser[]>([]);
  readonly error = signal('');
  ngOnInit(): void { this.service.getUsers().then(users => this.users.set(users)).catch(error => this.error.set(error?.status === 401 ? 'Authentication is required.' : error?.status === 403 ? 'You are not authorized to view user management.' : 'Users could not be loaded.')); }
}

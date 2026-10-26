import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardService, RbacUser } from './dashboard.service';

@Component({ selector: 'app-admin-roles', standalone: true, imports: [CommonModule, RouterModule], templateUrl: './admin-roles.component.html', styleUrl: './admin-users.component.css' })
export class AdminRolesComponent implements OnInit {
  private readonly service = inject(DashboardService);
  readonly roles = signal<Array<{ name: string; users: number }>>([]);
  readonly error = signal('');
  ngOnInit(): void { this.service.getUsers().then(users => { const counts = new Map<string, number>(); users.forEach((user: RbacUser) => user.roles.forEach(role => counts.set(role, (counts.get(role) || 0) + 1))); this.roles.set([...counts.entries()].map(([name, users]) => ({ name, users }))); }).catch(error => this.error.set(error?.status === 403 ? 'You are not authorized to view roles.' : 'Roles could not be loaded.')); }
}

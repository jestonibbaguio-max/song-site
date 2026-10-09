import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { catchError, forkJoin, of } from 'rxjs';

import { API_BASE_URL } from '../api.config';

interface MaintenanceArea {
  title: string;
  description: string;
  status: string;
  icon: string;
  items: string[];
}

interface DashboardStat {
  label: string;
  value: string;
  detail: string;
  state: 'ready' | 'pending' | 'warning';
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
  private readonly http = inject(HttpClient);
  private readonly loading = signal(true);
  private readonly apiAvailable = signal(false);
  private readonly siteCounts = signal({ journey: 0, training: 0, leadership: 0 });

  readonly stats = computed<DashboardStat[]>(() => {
    const counts = this.siteCounts();
    const apiState = this.apiAvailable();
    return [
      {
        label: 'Journey tasks',
        value: this.loading() ? '—' : String(counts.journey),
        detail: apiState ? 'API-backed records' : 'Awaiting API',
        state: apiState ? 'ready' : 'warning',
      },
      {
        label: 'Training tasks',
        value: this.loading() ? '—' : String(counts.training),
        detail: apiState ? 'API-backed records' : 'Awaiting API',
        state: apiState ? 'ready' : 'warning',
      },
      {
        label: 'Leadership records',
        value: this.loading() ? '—' : String(counts.leadership),
        detail: apiState ? 'Published sections' : 'Awaiting API',
        state: apiState ? 'ready' : 'warning',
      },
      {
        label: 'Users',
        value: 'Pending',
        detail: 'RBAC API required',
        state: 'pending',
      },
      {
        label: 'Onboarding requests',
        value: 'Pending',
        detail: 'Onboarding API required',
        state: 'pending',
      },
      {
        label: 'Audit events',
        value: 'Pending',
        detail: 'Audit API required',
        state: 'pending',
      },
    ];
  });

  readonly navigationGroups = [
    {
      label: 'Workspace',
      items: [{ label: 'Overview', icon: 'grid', enabled: true }],
    },
    {
      label: 'Maintenance',
      items: [
        { label: 'Users & onboarding', icon: 'people', enabled: false },
        { label: 'Scopes', icon: 'scope', enabled: false },
        { label: 'Roles', icon: 'shield', enabled: false },
        { label: 'Permissions', icon: 'key', enabled: false },
        { label: 'Site content', icon: 'edit', enabled: false },
      ],
    },
    {
      label: 'Governance',
      items: [
        { label: 'Audit history', icon: 'history', enabled: false },
        { label: 'System settings', icon: 'settings', enabled: false },
      ],
    },
  ];

  readonly maintenanceAreas: MaintenanceArea[] = [
    {
      title: 'People & access',
      description: 'Review onboarding requests, members, roles, and account status.',
      status: 'RBAC connection pending',
      icon: 'people',
      items: ['Onboarding approvals', 'Member directory', 'Role assignments'],
    },
    {
      title: 'Scopes',
      description: 'Maintain the controlled organizational values used by authoring workflows.',
      status: 'Reference API pending',
      icon: 'scope',
      items: ['Markets', 'Practices', 'Capabilities', 'Teams'],
    },
    {
      title: 'Roles & permissions',
      description: 'Manage approved policy mappings with an auditable change history.',
      status: 'Policy API pending',
      icon: 'shield',
      items: ['Role catalog', 'Permission mappings', 'Policy history'],
    },
    {
      title: 'Site content',
      description: 'Open the authoring areas available to administrators and scoped leads.',
      status: 'Authoring permissions pending',
      icon: 'edit',
      items: ['Leadership', 'Home content', 'Song Links'],
    },
  ];

  constructor() {
    this.loadStats();
  }

  private loadStats(): void {
    forkJoin({
      journey: this.http.get<unknown[]>(`${API_BASE_URL}/tasks`),
      training: this.http.get<unknown[]>(`${API_BASE_URL}/training-tasks`),
      leadership: this.http.get<Record<string, unknown[]>>(`${API_BASE_URL}/leadership`),
    }).pipe(
      catchError(() => of(null)),
    ).subscribe(result => {
      this.loading.set(false);
      if (!result) {
        return;
      }

      const leadershipCount = Object.values(result.leadership)
        .reduce((total, section) => total + section.length, 0);
      this.siteCounts.set({
        journey: result.journey.length,
        training: result.training.length,
        leadership: leadershipCount,
      });
      this.apiAvailable.set(true);
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardService, DashboardSummary } from './dashboard.service';
import { SessionService } from '../auth/session.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private readonly dashboard = inject(DashboardService);
  private readonly sessionService = inject(SessionService);
  readonly session = this.sessionService.session;
  readonly summary = signal<DashboardSummary | null>(null);
  readonly error = signal('');
  readonly collapsed = signal(false);

  readonly navItems = [
    { label: 'Dashboard', glyph: '⌂', route: '/dashboard' },
    { label: 'User Management', glyph: '♙', route: '/admin/users', adminOnly: true },
    { label: 'Resources', glyph: '▤', route: '/other-links' },
    { label: 'Announcements', glyph: '◈', route: '/announcement' },
    { label: 'Settings', glyph: '⚙', route: '/settings' },
  ];

  ngOnInit(): void {
    this.collapsed.set(localStorage.getItem('song-site.dashboard.sidebar') === 'collapsed');
    void this.sessionService.refresh().catch(() => undefined);
    this.loadSummary();
  }

  toggleSidebar(): void {
    this.collapsed.update(value => !value);
    localStorage.setItem('song-site.dashboard.sidebar', this.collapsed() ? 'collapsed' : 'expanded');
  }

  isVisible(item: { adminOnly?: boolean }): boolean {
    return !item.adminOnly || this.session().identity?.permissions.includes('rbac:users:read') === true;
  }

  segmentWidth(value: number, segments: Array<{ value: number }>): string {
    const total = segments.reduce((sum, segment) => sum + segment.value, 0);
    return `${total ? Math.round((value / total) * 100) : 0}%`;
  }

  private loadSummary(): void {
    this.dashboard.getSummary().then(value => this.summary.set(value)).catch(error => {
      this.error.set('Dashboard data is currently unavailable.');
    });
  }
}

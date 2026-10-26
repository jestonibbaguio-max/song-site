import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { SessionService } from '../auth/session.service';

export type RbacUser = {
  id: string;
  email: string;
  displayName: string;
  provider: string;
  subject: string;
  isActive: boolean;
  roles: string[];
};

export type DashboardSummary = {
  identity: { displayName: string; email: string; role: string | null; mode: string } | null;
  cards: Array<{ key: string; label: string; value: number | string; detail: string }>;
};

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly http = inject(HttpClient);
  private readonly session = inject(SessionService);

  private api(path: string): string {
    const env = (import.meta as ImportMeta & { env?: Record<string, string> }).env;
    const configured = env?.['VITE_API_BASE_URL'] ?? '/api';
    const localBrowser = typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname);
    return `${localBrowser && configured.startsWith('http://localhost:5001') ? '/api' : configured}${path}`;
  }

  getSummary(): Promise<DashboardSummary> {
    return firstValueFrom(this.http.get<DashboardSummary>(this.api('/v1/dashboard/summary'), { withCredentials: true }));
  }

  getUsers(): Promise<RbacUser[]> {
    return firstValueFrom(this.http.get<RbacUser[]>(this.api('/v1/rbac/users'), { withCredentials: true }));
  }

  replaceRoles(userId: string, roles: string[]): Promise<unknown> {
    return firstValueFrom(this.http.put(this.api(`/v1/rbac/users/${encodeURIComponent(userId)}/roles`), { roles }, {
      withCredentials: true,
      headers: { 'X-CSRF-Token': this.session.csrf },
    }));
  }
}

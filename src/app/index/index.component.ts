import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { SessionService } from '../auth/session.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent implements OnInit {
  readonly isAuthenticated = computed(() => this.authService.isAuthenticated());
  readonly displayName = computed(() => this.authService.displayName());
  readonly isBusy = computed(() => this.authService.isBusy());
  private readonly sessionError = signal<string | null>(null);
  readonly error = computed(() => this.sessionError() ?? this.authService.error());
  private readonly sessionService = inject(SessionService);
  readonly session = this.sessionService.session;

  constructor(
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.has('sessionUnavailable')) {
      this.sessionError.set('Unable to verify your portal session. Please try again.');
    }
    void this.initializeAccess();
  }

  signIn(): void {
    this.sessionError.set(null);
    void this.authService.login();
  }

  private async initializeAccess(): Promise<void> {
    try {
      await this.sessionService.refresh();
    } catch {
      this.sessionError.set('Unable to verify your portal session. Please try again.');
      return;
    }

    await this.authService.initialize();
    if (this.session().authenticated) {
      void this.goToDashboard();
    } else if (this.authService.isAuthenticated()) {
      this.sessionError.set('Microsoft sign-in succeeded, but portal access is not available until backend identity verification is configured.');
    }
  }

  private goToDashboard(): void {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    const destination =
      returnUrl?.startsWith('/') && !returnUrl.startsWith('//') && !returnUrl.startsWith('/signin')
        ? returnUrl
        : '/dashboard';
    void this.router.navigateByUrl(destination);
  }
}

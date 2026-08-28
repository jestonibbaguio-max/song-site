import { CommonModule } from '@angular/common';
import { Component, OnInit, computed } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

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
  readonly error = computed(() => this.authService.error());

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    void this.authService.initialize().then(() => {
      if (this.authService.isAuthenticated()) {
        void this.goToDashboard();
      }
    });
  }

  signIn(): void {
    void this.authService.login();
  }

  skipSso(): void {
    void this.goToDashboard();
  }

  private goToDashboard(): void {
    void this.router.navigateByUrl('/dashboard');
  }
}

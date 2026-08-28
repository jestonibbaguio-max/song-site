import { Component, ViewChild, ElementRef, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  isSearchOpen = false;
  isProfileOpen = false;
  readonly account = computed(() => this.authService.account());
  readonly displayName = computed(() => this.authService.displayName());
  readonly userEmail = computed(() => this.account()?.username ?? '');
  readonly userInitials = computed(() => this.getInitials(this.displayName()));

  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(private readonly authService: AuthService) {}

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
    if (this.isSearchOpen) {
      setTimeout(() => this.searchInput.nativeElement.focus(), 150);
    }
  }

  toggleProfile(): void {
    this.isProfileOpen = !this.isProfileOpen;
  }

  logout(): void {
    this.isProfileOpen = false;
    void this.authService.logout();
  }

  private getInitials(fullName: string): string {
    const parts = fullName.trim().split(' ');
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
}


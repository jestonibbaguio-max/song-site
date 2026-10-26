import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SessionService } from '../auth/session.service';

@Component({ selector: 'app-settings', standalone: true, imports: [CommonModule, RouterModule], templateUrl: './settings.component.html', styleUrl: './admin-users.component.css' })
export class SettingsComponent { readonly session = inject(SessionService).session; }

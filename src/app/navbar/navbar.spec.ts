import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { Router } from '@angular/router';

import { Navbar } from './navbar';
import { provideTestRouter } from '../../testing/test-providers';
import { AuthService } from '../auth/auth.service';
import { SessionInfo, SessionService } from '../auth/session.service';

describe('NavbarComponent', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;
  const sessionState = signal<SessionInfo>({ mode: 'guest', authenticated: false, identity: null });
  const endDevelopmentSession = vi.fn(() => Promise.resolve());
  const logout = vi.fn(() => Promise.resolve());

  beforeEach(async () => {
    sessionState.set({ mode: 'guest', authenticated: false, identity: null });
    endDevelopmentSession.mockClear();
    logout.mockClear();
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [
        provideTestRouter(),
        { provide: AuthService, useValue: { logout } },
        {
          provide: SessionService,
          useValue: { session: sessionState.asReadonly(), endDevelopmentSession },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('does not expose a sign-in link in the portal header', () => {
    const header = fixture.nativeElement.querySelector('header');

    expect(header.querySelector('a[href="/signin"]')).toBeNull();
    expect(header.textContent).not.toContain('Sign In');
  });

  it('shows the backend-authenticated local identity in the account menu', () => {
    sessionState.set({
      mode: 'development',
      authenticated: true,
      identity: {
        provider: 'development',
        displayName: 'Local Administrator',
        email: 'admin@example.test',
        role: 'administrator',
        permissions: [],
      },
    });
    fixture.detectChanges();

    const header = fixture.nativeElement.querySelector('header');
    expect(header.querySelector('.profile-trigger')?.textContent).toContain('Local Administrator');
    expect(header.querySelector('.profile-dropdown')).not.toBeNull();
  });

  it('ends a local session and returns to sign-in', async () => {
    sessionState.set({
      mode: 'development',
      authenticated: true,
      identity: { displayName: 'Local Administrator', role: 'administrator', permissions: [] },
    });
    const router = TestBed.inject(Router);
    const navigate = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);

    await component.logout();

    expect(endDevelopmentSession).toHaveBeenCalledOnce();
    expect(navigate).toHaveBeenCalledWith('/signin');
    expect(logout).not.toHaveBeenCalled();
  });
});

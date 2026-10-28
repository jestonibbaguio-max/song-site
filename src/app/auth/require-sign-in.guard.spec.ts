import { signal } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TestBed } from '@angular/core/testing';

import { SessionInfo, SessionService } from './session.service';
import { requireSignIn } from './require-sign-in.guard';
import { routes } from '../app.routes';

describe('requireSignIn', () => {
  const sessionState = signal<SessionInfo>({ mode: 'guest', authenticated: false, identity: null });
  let refresh: ReturnType<typeof vi.fn>;
  let router: Router;

  beforeEach(() => {
    sessionState.set({ mode: 'guest', authenticated: false, identity: null });
    refresh = vi.fn(() => Promise.resolve());
    TestBed.configureTestingModule({
      providers: [
        { provide: SessionService, useValue: { session: sessionState.asReadonly(), refresh } },
      ],
    });
    router = TestBed.inject(Router);
  });

  const guard = (url: string) =>
    TestBed.runInInjectionContext(() =>
      requireSignIn({} as ActivatedRouteSnapshot, { url } as RouterStateSnapshot)
    );

  it('protects every portal route except sign-in and redirects', () => {
    const protectedRoutes = routes.filter(
      route => route.path !== '' && route.path !== 'signin' && route.path !== '**' && !route.redirectTo
    );
    const redirectRoutes = routes.filter(
      route => Boolean(route.redirectTo) && route.path !== '' && route.path !== '**'
    );

    expect(routes.find(route => route.path === '')?.redirectTo).toBe('signin');
    expect(routes.find(route => route.path === 'signin')?.canActivate).toBeUndefined();
    expect(protectedRoutes.length).toBeGreaterThan(0);
    for (const route of protectedRoutes) {
      expect(route.canActivate).toContain(requireSignIn);
    }
    for (const route of redirectRoutes) {
      expect(routes.find(target => target.path === route.redirectTo)?.canActivate)
        .toContain(requireSignIn);
    }
  });

  it('allows a route only when the backend session is authenticated', async () => {
    sessionState.set({
      mode: 'development',
      authenticated: true,
      identity: { displayName: 'Local Administrator', role: 'administrator', permissions: [] },
    });

    const result = await guard('/dashboard');

    expect(result).toBe(true);
    expect(refresh).toHaveBeenCalledOnce();
  });

  it('redirects unauthenticated users to the login page', async () => {
    const result = await guard('/home');

    expect(result).toBeInstanceOf(UrlTree);
    expect(result instanceof UrlTree ? router.serializeUrl(result) : result).toBe('/signin?returnUrl=%2Fhome');
  });

  it('fails closed when the backend session cannot be verified', async () => {
    refresh.mockRejectedValue(new Error('session unavailable'));

    const result = await guard('/dashboard');

    expect(result).toBeInstanceOf(UrlTree);
    expect(result instanceof UrlTree ? router.serializeUrl(result) : result)
      .toBe('/signin?returnUrl=%2Fdashboard&sessionUnavailable=true');
  });
});

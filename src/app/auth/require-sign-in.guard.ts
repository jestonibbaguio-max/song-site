import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { SessionService } from './session.service';

export const requireSignIn: CanActivateFn = async (_route, state) => {
  const router = inject(Router);
  const sessionService = inject(SessionService);

  try {
    await sessionService.refresh();
  } catch {
    return router.createUrlTree(['/signin'], {
      queryParams: { returnUrl: state.url, sessionUnavailable: true },
    });
  }

  return sessionService.session().authenticated
    ? true
    : router.createUrlTree(['/signin'], { queryParams: { returnUrl: state.url } });
};

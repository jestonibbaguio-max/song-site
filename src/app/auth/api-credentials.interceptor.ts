import { HttpInterceptorFn } from '@angular/common/http';

import { API_BASE_URL } from '../api.config';

export const apiCredentialsInterceptor: HttpInterceptorFn = (request, next) => {
  const isSongSiteApiRequest =
    request.url === API_BASE_URL ||
    request.url.startsWith(`${API_BASE_URL}/`) ||
    request.url.startsWith(`${API_BASE_URL}?`);

  return next(
    isSongSiteApiRequest && !request.withCredentials
      ? request.clone({ withCredentials: true })
      : request
  );
};

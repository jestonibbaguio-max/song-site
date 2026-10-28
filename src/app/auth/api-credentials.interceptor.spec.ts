import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { API_BASE_URL } from '../api.config';
import { apiCredentialsInterceptor } from './api-credentials.interceptor';

describe('apiCredentialsInterceptor', () => {
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([apiCredentialsInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('sends cookies to the configured Song Site API', () => {
    TestBed.inject(HttpClient).get(`${API_BASE_URL}/home/spotlight`).subscribe();

    const request = http.expectOne(`${API_BASE_URL}/home/spotlight`);
    expect(request.request.withCredentials).toBe(true);
    request.flush({});
  });

  it('does not send cookies to other origins', () => {
    TestBed.inject(HttpClient).get('https://example.test/resource').subscribe();

    const request = http.expectOne('https://example.test/resource');
    expect(request.request.withCredentials).toBe(false);
    request.flush({});
  });
});

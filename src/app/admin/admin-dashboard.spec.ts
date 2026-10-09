import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { API_BASE_URL } from '../api.config';
import { AdminDashboard } from './admin-dashboard';

describe('AdminDashboard', () => {
  let fixture: ComponentFixture<AdminDashboard>;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboard],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    http = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(AdminDashboard);
  });

  afterEach(() => http.verify({ ignoreCancelled: true }));

  it('renders API-backed site counts and keeps maintenance actions disabled', () => {
    fixture.detectChanges();

    const journeyRequest = http.expectOne(`${API_BASE_URL}/tasks`);
    const trainingRequest = http.expectOne(`${API_BASE_URL}/training-tasks`);
    const leadershipRequest = http.expectOne(`${API_BASE_URL}/leadership`);

    journeyRequest.flush([{}, {}, {}]);
    trainingRequest.flush([{}, {}]);
    leadershipRequest.flush({
      marketLeads: [{}, {}],
      practiceLeads: [{}],
      capabilityLeads: [],
      enablementChampions: [{}],
    });
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('h2')?.textContent).toContain('Site at a glance');
    expect(element.querySelector('.section-count')?.textContent).toContain('6 signals');
    expect(Array.from(element.querySelectorAll('.stat-card strong')).map(node => node.textContent?.trim()))
      .toEqual(['3', '2', '4', 'Pending', 'Pending', 'Pending']);
    expect(element.querySelector('.notice')?.textContent).toContain('Read-only dashboard preview');
    expect(element.querySelectorAll('button:disabled').length).toBe(11);
  });

  it('shows the pending API state when a site count request fails', () => {
    fixture.detectChanges();

    const journeyRequest = http.expectOne(`${API_BASE_URL}/tasks`);
    http.expectOne(`${API_BASE_URL}/training-tasks`);
    http.expectOne(`${API_BASE_URL}/leadership`);
    journeyRequest.flush('Unavailable', { status: 503, statusText: 'Service Unavailable' });
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(fixture.componentInstance.stats()[0]).toEqual({
      label: 'Journey tasks',
      value: '0',
      detail: 'Awaiting API',
      state: 'warning',
    });
    expect(element.querySelector('.notice')?.textContent).toContain('Read-only dashboard preview');
    expect(element.querySelector('.hero-status')?.textContent).toContain('Authorization services pending');
  });
});

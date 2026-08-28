import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SpotlightPerson {
  id: number;
  displayName: string;
  fullName: string;
  certification: string;
  bio: string;
  image: string;
  headshot: string | null;
}

export interface SpotlightData {
  title: string;
  persons: SpotlightPerson[];
}

export interface Announcement {
  id: number;
  icon: string;
  title: string;
  body: string;
}

@Injectable({ providedIn: 'root' })
export class HomeService {
  private http = inject(HttpClient);

  getSpotlight(): Observable<SpotlightData> {
    return this.http.get<SpotlightData>('http://localhost:5001/api/home/spotlight');
  }

  getAnnouncements(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>('http://localhost:5001/api/home/announcements');
  }
}

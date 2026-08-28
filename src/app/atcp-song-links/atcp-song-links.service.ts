import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LinkCard {
  title: string;
  description: string;
  linkText: string;
  url: string;
  external?: boolean;
}

export interface LinkSection {
  title: string;
  cards: LinkCard[];
}

@Injectable({ providedIn: 'root' })
export class AtcpSongLinksService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:5001/api/song-links';

  getSections(): Observable<LinkSection[]> {
    return this.http.get<LinkSection[]>(this.apiUrl);
  }
}

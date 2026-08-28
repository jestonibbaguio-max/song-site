import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeadershipData } from '../models/atcp-song.model';

@Injectable({ providedIn: 'root' })
export class AtcpSongService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:5001/api/leadership';

  getData(): Observable<LeadershipData> {
    return this.http.get<LeadershipData>(this.apiUrl);
  }
}

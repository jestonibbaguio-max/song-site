// src/app/services/atcp-song.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AtcpSongData } from '../models/atcp-song.model';

@Injectable({ providedIn: 'root' })
export class AtcpSongService {
  private readonly http = inject(HttpClient);
  private readonly dataUrl = 'assets/data/atcp-song.json';

  getData(): Observable<AtcpSongData> {
    return this.http.get<AtcpSongData>(this.dataUrl);
  }
}

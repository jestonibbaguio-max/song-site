import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrainingTask } from './models/training-task';

@Injectable({ providedIn: 'root' })
export class TrainingTaskService {
  private apiUrl = 'http://localhost:5001/api';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<TrainingTask[]> {
    return this.http.get<TrainingTask[]>(`${this.apiUrl}/training-tasks`);
  }

  getProgress(): Observable<{ progress: number }> {
    return this.http.get<{ progress: number }>(`${this.apiUrl}/training-progress-status`);
  }

  updateTaskStatus(id: number, action: 'start' | 'complete') {
    return this.http.put<TrainingTask>(`${this.apiUrl}/training-tasks/${id}/status`, { action });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './models/task';   // <-- only import, no local redeclare

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl = 'http://localhost:5001/api';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/tasks`);
  }

  getProgress(): Observable<{ progress: number }> {
    return this.http.get<{ progress: number }>(`${this.apiUrl}/progress-status`);
  }

  updateTaskStatus(id: number, action: 'start' | 'complete') {
    return this.http.put<Task>(`${this.apiUrl}/tasks/${id}/status`, { action });
  }

  updateTask(id: number, data: any) {
    return this.http.put(
    `${this.apiUrl}/tasks/${id}`,
    data
    );
  }

  getTrainingTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/training-tasks`);
  }
}

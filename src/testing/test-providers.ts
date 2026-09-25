import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { TaskService } from '../app/song-bench/my-journey/task.service';
import { HomeService } from '../app/home/home.service';

export function provideTestRouter() {
  return provideRouter([]);
}

export function provideTaskServiceStub() {
  return {
    provide: TaskService,
    useValue: {
      getTasks: () => of([]),
      getTrainingTasks: () => of([]),
      getProgress: () => of({ progress: 0 }),
      updateTaskStatus: () => of({}),
      updateTask: () => of({}),
    },
  };
}

export function provideHomeServiceStub() {
  return {
    provide: HomeService,
    useValue: {
      getSpotlight: () => of({
        title: 'Test spotlight',
        persons: [{
          id: 1,
          displayName: 'Test Person',
          fullName: 'Test Person',
          certification: '',
          bio: '',
          image: '',
          headshot: null,
        }],
      }),
      getAnnouncements: () => of([]),
    },
  };
}

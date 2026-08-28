import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSummary } from './task-summary';

describe('TaskSummary', () => {
  let component: TaskSummary;
  let fixture: ComponentFixture<TaskSummary>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaskSummary]
    });
    fixture = TestBed.createComponent(TaskSummary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

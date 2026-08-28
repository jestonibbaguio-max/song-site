import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskGrid } from './task-grid';

describe('TaskGrid', () => {
  let component: TaskGrid;
  let fixture: ComponentFixture<TaskGrid>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskGrid]
  });
    fixture = TestBed.createComponent(TaskGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
  expect(component).toBeTruthy();
  });
});
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskGrid } from './task-grid';
import { provideTaskServiceStub, provideTestRouter } from '../../../../testing/test-providers';

describe('TaskGrid', () => {
  let component: TaskGrid;
  let fixture: ComponentFixture<TaskGrid>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaskGrid],
      providers: [provideTestRouter(), provideTaskServiceStub()]
    });
    fixture = TestBed.createComponent(TaskGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

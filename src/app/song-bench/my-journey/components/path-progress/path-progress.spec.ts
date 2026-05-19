import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathProgress } from './path-progress';

describe('PathProgress', () => {
  let component: PathProgress;
  let fixture: ComponentFixture<PathProgress>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PathProgress]
    });
    fixture = TestBed.createComponent(PathProgress);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLearningPlatform } from './my-learning-platform';

describe('MyLearningPlatform', () => {
  let component: MyLearningPlatform;
  let fixture: ComponentFixture<MyLearningPlatform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyLearningPlatform],
    }).compileComponents();

    fixture = TestBed.createComponent(MyLearningPlatform);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

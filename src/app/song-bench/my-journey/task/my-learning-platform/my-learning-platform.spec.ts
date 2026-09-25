import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLearningPlatform } from './my-learning-platform';
import { provideTaskServiceStub, provideTestRouter } from '../../../../../testing/test-providers';

describe('MyLearningPlatform', () => {
  let component: MyLearningPlatform;
  let fixture: ComponentFixture<MyLearningPlatform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyLearningPlatform],
      providers: [provideTestRouter(), provideTaskServiceStub()],
    }).compileComponents();

    fixture = TestBed.createComponent(MyLearningPlatform);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCompliance } from './my-compliance';
import { provideTaskServiceStub, provideTestRouter } from '../../../../../testing/test-providers';

describe('MyCompliance', () => {
  let component: MyCompliance;
  let fixture: ComponentFixture<MyCompliance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCompliance],
      providers: [provideTestRouter(), provideTaskServiceStub()],
    }).compileComponents();

    fixture = TestBed.createComponent(MyCompliance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

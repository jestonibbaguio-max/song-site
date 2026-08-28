import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCompliance } from './my-compliance';

describe('MyCompliance', () => {
  let component: MyCompliance;
  let fixture: ComponentFixture<MyCompliance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCompliance],
    }).compileComponents();

    fixture = TestBed.createComponent(MyCompliance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

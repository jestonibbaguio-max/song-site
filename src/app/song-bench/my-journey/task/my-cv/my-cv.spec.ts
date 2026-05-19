import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCv } from './my-cv';

describe('MyCv', () => {
  let component: MyCv;
  let fixture: ComponentFixture<MyCv>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCv],
    }).compileComponents();

    fixture = TestBed.createComponent(MyCv);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

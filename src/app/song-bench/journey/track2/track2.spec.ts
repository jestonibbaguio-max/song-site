import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Track2 } from './track2';

describe('Track2', () => {
  let component: Track2;
  let fixture: ComponentFixture<Track2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Track2],
    }).compileComponents();

    fixture = TestBed.createComponent(Track2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

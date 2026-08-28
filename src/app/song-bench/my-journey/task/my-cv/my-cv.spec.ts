import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { MyCv } from './my-cv';

describe('MyCv', () => {
  let component: MyCv;
  let fixture: ComponentFixture<MyCv>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCv],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MyCv);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default state', () => {
    expect(component.isWaiting).toBeFalse();
  });

  it('should set isWaiting to true when markCompleted is called', () => {
    component.markCompleted();
    expect(component.isWaiting).toBeTrue();
  });
});

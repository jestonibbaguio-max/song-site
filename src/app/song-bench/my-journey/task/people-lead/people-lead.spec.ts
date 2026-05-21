import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { PeopleLead } from './people-lead';

describe('PeopleLead', () => {
  let component: PeopleLead;
  let fixture: ComponentFixture<PeopleLead>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleLead],
      providers: [provideRouter([])]
    }).compileComponents();
 
    fixture = TestBed.createComponent(PeopleLead);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
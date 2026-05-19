import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { MyCompetency } from './mycompetency';

describe('MyCompetency', () => {
  let component: MyCompetency;
  let fixture: ComponentFixture<MyCompetency>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCompetency],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(MyCompetency);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
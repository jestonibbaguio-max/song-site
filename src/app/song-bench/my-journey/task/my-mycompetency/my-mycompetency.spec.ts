import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { MyMyCompetency } from './my-mycompetency';

describe('MyMyCompetency', () => {
  let component: MyMyCompetency;
  let fixture: ComponentFixture<MyMyCompetency>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyMyCompetency],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(MyMyCompetency);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
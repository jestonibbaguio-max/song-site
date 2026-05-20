import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { MyMyRiro } from './my-myriro';

describe('MyMyRiro', () => {
  let component: MyMyRiro;
  let fixture: ComponentFixture<MyMyRiro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyMyRiro],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(MyMyRiro);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
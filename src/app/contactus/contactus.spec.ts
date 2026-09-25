import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Contactus } from './contactus';
import { provideTestRouter } from '../../testing/test-providers';

describe('Contactus', () => {
  let component: Contactus;
  let fixture: ComponentFixture<Contactus>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Contactus],
      providers: [provideTestRouter()]
    });
    fixture = TestBed.createComponent(Contactus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

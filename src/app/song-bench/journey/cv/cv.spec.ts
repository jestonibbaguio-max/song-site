import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cv } from './cv';
import { provideTestRouter } from '../../../../testing/test-providers';

describe('Cv', () => {
  let component: Cv;
  let fixture: ComponentFixture<Cv>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cv],
      providers: [provideTestRouter()],
    }).compileComponents();

    fixture = TestBed.createComponent(Cv);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

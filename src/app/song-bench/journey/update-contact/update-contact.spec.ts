import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateContact } from './update-contact';
import { provideTestRouter } from '../../../../testing/test-providers';

describe('UpdateContact', () => {
  let component: UpdateContact;
  let fixture: ComponentFixture<UpdateContact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateContact],
      providers: [provideTestRouter()],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateContact);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

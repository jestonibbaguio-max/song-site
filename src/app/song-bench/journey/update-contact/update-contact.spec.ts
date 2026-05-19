import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateContact } from './update-contact';

describe('UpdateContact', () => {
  let component: UpdateContact;
  let fixture: ComponentFixture<UpdateContact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateContact],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateContact);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

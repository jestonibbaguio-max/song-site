import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyUpdateContact } from './my-update-contact';

describe('MyUpdateContact', () => {
  let component: MyUpdateContact;
  let fixture: ComponentFixture<MyUpdateContact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyUpdateContact],
    }).compileComponents();

    fixture = TestBed.createComponent(MyUpdateContact);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

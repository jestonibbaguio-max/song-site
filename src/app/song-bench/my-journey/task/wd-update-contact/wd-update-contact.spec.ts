import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WDUpdateContact } from './wd-update-contact';

describe('WDUpdateContact', () => {
  let component: WDUpdateContact;
  let fixture: ComponentFixture<WDUpdateContact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WDUpdateContact],
    }).compileComponents();

    fixture = TestBed.createComponent(WDUpdateContact);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

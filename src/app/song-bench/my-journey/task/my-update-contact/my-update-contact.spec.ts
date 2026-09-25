import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyUpdateContact } from './my-update-contact';
import { provideTaskServiceStub, provideTestRouter } from '../../../../../testing/test-providers';

describe('MyUpdateContact', () => {
  let component: MyUpdateContact;
  let fixture: ComponentFixture<MyUpdateContact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyUpdateContact],
      providers: [provideTestRouter(), provideTaskServiceStub()],
    }).compileComponents();

    fixture = TestBed.createComponent(MyUpdateContact);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

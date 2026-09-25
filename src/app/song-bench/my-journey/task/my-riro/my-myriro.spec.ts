import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyMyRiro } from './my-myriro';
import { provideTaskServiceStub, provideTestRouter } from '../../../../../testing/test-providers';

describe('MyMyRiro', () => {
  let component: MyMyRiro;
  let fixture: ComponentFixture<MyMyRiro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyMyRiro],
      providers: [provideTestRouter(), provideTaskServiceStub()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyMyRiro);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

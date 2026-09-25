import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeopleLead } from './people-lead';
import { provideTaskServiceStub, provideTestRouter } from '../../../../../testing/test-providers';

describe('PeopleLead', () => {
  let component: PeopleLead;
  let fixture: ComponentFixture<PeopleLead>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleLead],
      providers: [provideTestRouter(), provideTaskServiceStub()]
    }).compileComponents();
 
    fixture = TestBed.createComponent(PeopleLead);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

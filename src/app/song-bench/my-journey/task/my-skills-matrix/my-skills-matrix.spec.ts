import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySkillsMatrix } from './my-skills-matrix';
import { provideTaskServiceStub, provideTestRouter } from '../../../../../testing/test-providers';

describe('MySkillsMatrix', () => {
  let component: MySkillsMatrix;
  let fixture: ComponentFixture<MySkillsMatrix>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MySkillsMatrix],
      providers: [provideTestRouter(), provideTaskServiceStub()],
    }).compileComponents();

    fixture = TestBed.createComponent(MySkillsMatrix);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

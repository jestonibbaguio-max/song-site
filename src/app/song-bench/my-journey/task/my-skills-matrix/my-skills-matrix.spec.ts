import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySkillsMatrix } from './my-skills-matrix';

describe('MySkillsMatrix', () => {
  let component: MySkillsMatrix;
  let fixture: ComponentFixture<MySkillsMatrix>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MySkillsMatrix],
    }).compileComponents();

    fixture = TestBed.createComponent(MySkillsMatrix);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

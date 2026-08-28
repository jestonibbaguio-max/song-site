import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsMatrix } from './skills-matrix';

describe('SkillsMatrix', () => {
  let component: SkillsMatrix;
  let fixture: ComponentFixture<SkillsMatrix>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsMatrix],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsMatrix);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

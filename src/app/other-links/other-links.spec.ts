import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OtherLinks } from './other-links';

describe('OtherLinksComponent', () => {
  let component: OtherLinks;
  let fixture: ComponentFixture<OtherLinks>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtherLinks]
    });
    fixture = TestBed.createComponent(OtherLinks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

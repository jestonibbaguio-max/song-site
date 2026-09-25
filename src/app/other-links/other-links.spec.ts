import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OtherLinks } from './other-links';
import { provideTestRouter } from '../../testing/test-providers';

describe('OtherLinksComponent', () => {
  let component: OtherLinks;
  let fixture: ComponentFixture<OtherLinks>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OtherLinks],
      providers: [provideTestRouter()]
    });
    fixture = TestBed.createComponent(OtherLinks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

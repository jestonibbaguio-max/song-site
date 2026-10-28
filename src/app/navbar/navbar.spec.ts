import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Navbar } from './navbar';
import { provideTestRouter } from '../../testing/test-providers';

describe('NavbarComponent', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [provideTestRouter()]
    });
    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('does not expose a sign-in link in the portal header', () => {
    const header = fixture.nativeElement.querySelector('header');

    expect(header.querySelector('a[href="/signin"]')).toBeNull();
    expect(header.textContent).not.toContain('Sign In');
  });
});

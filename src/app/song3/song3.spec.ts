import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Song3 } from './song3';
import { provideTestRouter } from '../../testing/test-providers';

describe('Song3', () => {
  let component: Song3;
  let fixture: ComponentFixture<Song3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Song3],
      providers: [provideTestRouter()],
    }).compileComponents();

    fixture = TestBed.createComponent(Song3);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

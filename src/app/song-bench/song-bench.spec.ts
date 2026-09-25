import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongBench } from '../song-bench/song-bench';
import { provideTestRouter } from '../../testing/test-providers';

describe('SongBench', () => {
  let component: SongBench;
  let fixture: ComponentFixture<SongBench>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongBench],
      providers: [provideTestRouter()],
    }).compileComponents();

    fixture = TestBed.createComponent(SongBench);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

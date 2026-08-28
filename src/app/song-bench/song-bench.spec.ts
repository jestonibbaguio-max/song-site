import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongBench } from '../song-bench/song-bench';

describe('SongBench', () => {
  let component: SongBench;
  let fixture: ComponentFixture<SongBench>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongBench],
    }).compileComponents();

    fixture = TestBed.createComponent(SongBench);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

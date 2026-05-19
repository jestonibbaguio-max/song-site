import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtcpSong } from '../atcp-song/atcp-song';

describe('AtcpSong', () => {
  let component: AtcpSong;
  let fixture: ComponentFixture<AtcpSong>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtcpSong],
    }).compileComponents();

    fixture = TestBed.createComponent(AtcpSong);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

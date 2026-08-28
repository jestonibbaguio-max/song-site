import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtcpSong2 } from '../atcp-song2/atcp-song2';

describe('AtcpSong2', () => {
  let component: AtcpSong2;
  let fixture: ComponentFixture<AtcpSong2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtcpSong2],
    }).compileComponents();

    fixture = TestBed.createComponent(AtcpSong2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

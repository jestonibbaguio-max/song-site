import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAssetTracker } from './my-asset-tracker';

describe('MyAssetTracker', () => {
  let component: MyAssetTracker;
  let fixture: ComponentFixture<MyAssetTracker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyAssetTracker],
    }).compileComponents();

    fixture = TestBed.createComponent(MyAssetTracker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

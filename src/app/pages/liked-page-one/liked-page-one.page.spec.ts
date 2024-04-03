import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LikedPageOnePage } from './liked-page-one.page';

describe('LikedPageOnePage', () => {
  let component: LikedPageOnePage;
  let fixture: ComponentFixture<LikedPageOnePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LikedPageOnePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

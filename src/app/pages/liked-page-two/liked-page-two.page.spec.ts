import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LikedPageTwoPage } from './liked-page-two.page';

describe('LikedPageTwoPage', () => {
  let component: LikedPageTwoPage;
  let fixture: ComponentFixture<LikedPageTwoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LikedPageTwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchesPagePage } from './matches-page.page';

describe('MatchesPagePage', () => {
  let component: MatchesPagePage;
  let fixture: ComponentFixture<MatchesPagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MatchesPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

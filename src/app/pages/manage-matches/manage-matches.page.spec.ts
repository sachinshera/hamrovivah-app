import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageMatchesPage } from './manage-matches.page';

describe('ManageMatchesPage', () => {
  let component: ManageMatchesPage;
  let fixture: ComponentFixture<ManageMatchesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ManageMatchesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

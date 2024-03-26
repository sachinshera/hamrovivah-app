import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchPartnerPage } from './search-partner.page';

describe('SearchPartnerPage', () => {
  let component: SearchPartnerPage;
  let fixture: ComponentFixture<SearchPartnerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SearchPartnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchresultPage } from './searchresult.page';

describe('SearchresultPage', () => {
  let component: SearchresultPage;
  let fixture: ComponentFixture<SearchresultPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SearchresultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

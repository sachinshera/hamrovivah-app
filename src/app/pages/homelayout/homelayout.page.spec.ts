import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomelayoutPage } from './homelayout.page';

describe('HomelayoutPage', () => {
  let component: HomelayoutPage;
  let fixture: ComponentFixture<HomelayoutPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomelayoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

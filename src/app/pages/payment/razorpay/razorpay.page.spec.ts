import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RazorpayPage } from './razorpay.page';

describe('RazorpayPage', () => {
  let component: RazorpayPage;
  let fixture: ComponentFixture<RazorpayPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RazorpayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

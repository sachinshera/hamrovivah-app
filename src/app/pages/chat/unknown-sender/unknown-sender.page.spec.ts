import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnknownSenderPage } from './unknown-sender.page';

describe('UnknownSenderPage', () => {
  let component: UnknownSenderPage;
  let fixture: ComponentFixture<UnknownSenderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UnknownSenderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

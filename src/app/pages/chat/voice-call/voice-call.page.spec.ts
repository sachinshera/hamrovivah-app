import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VoiceCallPage } from './voice-call.page';

describe('VoiceCallPage', () => {
  let component: VoiceCallPage;
  let fixture: ComponentFixture<VoiceCallPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VoiceCallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

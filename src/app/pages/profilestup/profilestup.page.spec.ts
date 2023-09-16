import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilestupPage } from './profilestup.page';

describe('ProfilestupPage', () => {
  let component: ProfilestupPage;
  let fixture: ComponentFixture<ProfilestupPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProfilestupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

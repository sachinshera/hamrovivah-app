import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PartnerprefrencesPage } from './partnerprefrences.page';

describe('PartnerprefrencesPage', () => {
  let component: PartnerprefrencesPage;
  let fixture: ComponentFixture<PartnerprefrencesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PartnerprefrencesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

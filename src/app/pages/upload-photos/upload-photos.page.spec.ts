import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadPhotosPage } from './upload-photos.page';

describe('UploadPhotosPage', () => {
  let component: UploadPhotosPage;
  let fixture: ComponentFixture<UploadPhotosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UploadPhotosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

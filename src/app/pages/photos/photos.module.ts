import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhotosPageRoutingModule } from './photos-routing.module';

import { PhotosPage } from './photos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhotosPageRoutingModule
  ],
  declarations: [PhotosPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PhotosPageModule { }

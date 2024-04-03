import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LikedPageOnePageRoutingModule } from './liked-page-one-routing.module';

import { LikedPageOnePage } from './liked-page-one.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LikedPageOnePageRoutingModule
  ],
  declarations: [LikedPageOnePage]
})
export class LikedPageOnePageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LikedPageTwoPageRoutingModule } from './liked-page-two-routing.module';

import { LikedPageTwoPage } from './liked-page-two.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LikedPageTwoPageRoutingModule
  ],
  declarations: [LikedPageTwoPage]
})
export class LikedPageTwoPageModule {}

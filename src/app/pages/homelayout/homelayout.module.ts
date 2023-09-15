import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomelayoutPageRoutingModule } from './homelayout-routing.module';

import { HomelayoutPage } from './homelayout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomelayoutPageRoutingModule
  ],
  declarations: [HomelayoutPage]
})
export class HomelayoutPageModule {}

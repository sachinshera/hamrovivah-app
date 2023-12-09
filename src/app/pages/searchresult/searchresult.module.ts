import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchresultPageRoutingModule } from './searchresult-routing.module';

import { SearchresultPage } from './searchresult.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { HomelayoutPageModule } from '../homelayout/homelayout.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchresultPageRoutingModule,
    HomelayoutPageModule
  ],
  declarations: [SearchresultPage],
  exports: []
})
export class SearchresultPageModule { }

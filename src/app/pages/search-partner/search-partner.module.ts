import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPartnerPageRoutingModule } from './search-partner-routing.module';

import { SearchPartnerPage } from './search-partner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPartnerPageRoutingModule
  ],
  declarations: [SearchPartnerPage]
})
export class SearchPartnerPageModule {}

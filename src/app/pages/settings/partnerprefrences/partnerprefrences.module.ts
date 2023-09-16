import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PartnerprefrencesPageRoutingModule } from './partnerprefrences-routing.module';

import { PartnerprefrencesPage } from './partnerprefrences.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PartnerprefrencesPageRoutingModule
  ],
  declarations: [PartnerprefrencesPage]
})
export class PartnerprefrencesPageModule {}

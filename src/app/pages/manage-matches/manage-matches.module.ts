import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageMatchesPageRoutingModule } from './manage-matches-routing.module';

import { ManageMatchesPage } from './manage-matches.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageMatchesPageRoutingModule
  ],
  declarations: [ManageMatchesPage]
})
export class ManageMatchesPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatchesPagePageRoutingModule } from './matches-page-routing.module';

import { MatchesPagePage } from './matches-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatchesPagePageRoutingModule
  ],
  declarations: [MatchesPagePage]
})
export class MatchesPagePageModule {}

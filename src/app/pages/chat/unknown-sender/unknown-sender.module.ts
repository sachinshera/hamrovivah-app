import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnknownSenderPageRoutingModule } from './unknown-sender-routing.module';

import { UnknownSenderPage } from './unknown-sender.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UnknownSenderPageRoutingModule
  ],
  declarations: [UnknownSenderPage]
})
export class UnknownSenderPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { MyprofilePageRoutingModule } from './myprofile-routing.module';

import { MyprofilePage } from './myprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyprofilePageRoutingModule
  ],
  declarations: [MyprofilePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyprofilePageModule { }

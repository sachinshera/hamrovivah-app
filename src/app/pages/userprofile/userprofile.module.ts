import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicSlides } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserprofilePageRoutingModule } from './userprofile-routing.module';

import { UserprofilePage } from './userprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserprofilePageRoutingModule,
  ],
  declarations: [UserprofilePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserprofilePageModule { }

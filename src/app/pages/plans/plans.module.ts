import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { PlansPageRoutingModule } from './plans-routing.module';

import { PlansPage } from './plans.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlansPageRoutingModule
  ],
  declarations: [PlansPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlansPageModule { }

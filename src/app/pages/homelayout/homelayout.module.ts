import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomelayoutPageRoutingModule } from './homelayout-routing.module';

import { HomelayoutPage } from './homelayout.page';
import { ProfilelistComponent } from 'src/app/components/profilelist/profilelist.component';
import { ProfilesearchComponent } from 'src/app/components/profilesearch/profilesearch.component';
import { HomemenuComponent } from 'src/app/components/homemenu/homemenu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomelayoutPageRoutingModule
  ],
  declarations: [HomelayoutPage, ProfilelistComponent, ProfilesearchComponent, HomemenuComponent]
})
export class HomelayoutPageModule { }

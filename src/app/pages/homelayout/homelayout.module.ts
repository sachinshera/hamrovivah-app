import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomelayoutPageRoutingModule } from './homelayout-routing.module';

import { HomelayoutPage } from './homelayout.page';
import { ProfilesearchComponent } from 'src/app/components/profilesearch/profilesearch.component';
import { HomemenuComponent } from 'src/app/components/homemenu/homemenu.component';
import { NoticeboxComponent } from 'src/app/components/noticebox/noticebox.component';
import { ProfilelistComponent } from 'src/app/components/profilelist/profilelist.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomelayoutPageRoutingModule
  ],
  declarations: [HomelayoutPage, NoticeboxComponent, ProfilesearchComponent, ProfilelistComponent, HomemenuComponent],
  exports: [NoticeboxComponent, ProfilesearchComponent, ProfilelistComponent, HomemenuComponent]
})
export class HomelayoutPageModule { }

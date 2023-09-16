import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilestupPageRoutingModule } from './profilestup-routing.module';

import { ProfilestupPage } from './profilestup.page';
import { ProfilestartComponent } from 'src/app/components/profilestart/profilestart.component';
import { ProfilequestionComponent } from 'src/app/components/profilequestion/profilequestion.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilestupPageRoutingModule
  ],
  declarations: [ProfilestupPage, ProfilestartComponent, ProfilequestionComponent]
})
export class ProfilestupPageModule { }

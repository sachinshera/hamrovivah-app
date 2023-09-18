import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ProfilestupPageRoutingModule } from './profilestup-routing.module';

import { ProfilestupPage } from './profilestup.page';
import { ProfilestartComponent } from 'src/app/components/profilestart/profilestart.component';
import { ProfilequestionComponent } from 'src/app/components/profilequestion/profilequestion.component';
import { FormsuccessComponent } from 'src/app/components/formsuccess/formsuccess.component'; @NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilestupPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ProfilestupPage, ProfilestartComponent, ProfilequestionComponent, FormsuccessComponent]
})
export class ProfilestupPageModule { }

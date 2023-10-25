import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { CountryselectComponent } from 'src/app/components/actions/countryselect/countryselect.component';
import { LoginmobileComponent } from 'src/app/components/loginmobile/loginmobile.component';
import { LoginonboardComponent } from 'src/app/components/loginonboard/loginonboard.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule
  ],
  declarations: [LoginPage, CountryselectComponent, LoginmobileComponent, LoginonboardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginPageModule { }

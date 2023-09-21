import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './login.page';
import { LoginonboardComponent } from 'src/app/components/loginonboard/loginonboard.component';
import { LoginmobileComponent } from 'src/app/components/loginmobile/loginmobile.component';
const routes: Routes = [
  {
    path: '',
    component: LoginPage,
    children: [
      {
        path: '',
        redirectTo: 'mobile',
        pathMatch: 'full',
      },
      {
        path: 'onboard',
        component: LoginonboardComponent
      }, {
        path: 'mobile',
        component: LoginmobileComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule { }

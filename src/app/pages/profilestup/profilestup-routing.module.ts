import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilestupPage } from './profilestup.page';
import { ProfilestartComponent } from 'src/app/components/profilestart/profilestart.component';
import { ProfilequestionComponent } from 'src/app/components/profilequestion/profilequestion.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilestupPage,
    children: [
      {
        path: '',
        component: ProfilestartComponent
      },
      {
        path: 'form/:id',
        component: ProfilequestionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilestupPageRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageMatchesPage } from './manage-matches.page';

const routes: Routes = [
  {
    path: '',
    component: ManageMatchesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageMatchesPageRoutingModule {}

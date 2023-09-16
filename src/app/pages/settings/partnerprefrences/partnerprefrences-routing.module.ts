import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartnerprefrencesPage } from './partnerprefrences.page';

const routes: Routes = [
  {
    path: '',
    component: PartnerprefrencesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartnerprefrencesPageRoutingModule {}

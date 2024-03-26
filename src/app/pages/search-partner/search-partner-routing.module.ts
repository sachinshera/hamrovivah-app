import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchPartnerPage } from './search-partner.page';

const routes: Routes = [
  {
    path: '',
    component: SearchPartnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchPartnerPageRoutingModule {}

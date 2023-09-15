import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomelayoutPage } from './homelayout.page';

const routes: Routes = [
  {
    path: '',
    component: HomelayoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomelayoutPageRoutingModule {}

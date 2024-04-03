import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LikedPageTwoPage } from './liked-page-two.page';

const routes: Routes = [
  {
    path: '',
    component: LikedPageTwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LikedPageTwoPageRoutingModule {}

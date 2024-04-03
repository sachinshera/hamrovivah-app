import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LikedPageOnePage } from './liked-page-one.page';

const routes: Routes = [
  {
    path: '',
    component: LikedPageOnePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LikedPageOnePageRoutingModule {}

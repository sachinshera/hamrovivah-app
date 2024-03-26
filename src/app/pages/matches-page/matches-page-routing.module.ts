import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatchesPagePage } from './matches-page.page';

const routes: Routes = [
  {
    path: '',
    component: MatchesPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchesPagePageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnknownSenderPage } from './unknown-sender.page';

const routes: Routes = [
  {
    path: '',
    component: UnknownSenderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnknownSenderPageRoutingModule {}

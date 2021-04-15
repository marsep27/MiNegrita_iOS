import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RomeriaPage } from './romeria.page';

const routes: Routes = [
  {
    path: '',
    component: RomeriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RomeriaPageRoutingModule {}

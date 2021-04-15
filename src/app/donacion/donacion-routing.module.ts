import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonacionPage } from './donacion.page';

const routes: Routes = [
  {
    path: '',
    component: DonacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonacionPageRoutingModule {}

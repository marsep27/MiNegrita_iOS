import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevaRomeriaPage } from './nueva-romeria.page';

const routes: Routes = [
  {
    path: '',
    component: NuevaRomeriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevaRomeriaPageRoutingModule {}

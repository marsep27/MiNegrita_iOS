import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContinuarRomeriaPage } from './continuar-romeria.page';

const routes: Routes = [
  {
    path: '',
    component: ContinuarRomeriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContinuarRomeriaPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroCuentaPage } from './registro-cuenta.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroCuentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroCuentaPageRoutingModule {}

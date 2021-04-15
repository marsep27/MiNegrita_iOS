import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroDatosPage } from './registro-datos.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroDatosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroDatosPageRoutingModule {}

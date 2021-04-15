import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroIntencionesPage } from './registro-intenciones.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroIntencionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroIntencionesPageRoutingModule {}

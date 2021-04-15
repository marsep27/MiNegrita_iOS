import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjustesPerfilPage } from './ajustes-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: AjustesPerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjustesPerfilPageRoutingModule {}

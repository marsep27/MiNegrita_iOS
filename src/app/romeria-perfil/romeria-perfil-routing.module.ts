import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RomeriaPerfilPage } from './romeria-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: RomeriaPerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RomeriaPerfilPageRoutingModule {}

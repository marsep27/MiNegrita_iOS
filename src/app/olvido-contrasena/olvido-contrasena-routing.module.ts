import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OlvidoContrasenaPage } from './olvido-contrasena.page';

const routes: Routes = [
  {
    path: '',
    component: OlvidoContrasenaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OlvidoContrasenaPageRoutingModule {}

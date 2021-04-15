import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroExvotosPage } from './registro-exvotos.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroExvotosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroExvotosPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevocionarioPage } from './devocionario.page';

const routes: Routes = [
  {
    path: '',
    component: DevocionarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevocionarioPageRoutingModule {}

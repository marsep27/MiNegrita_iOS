import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoronillaPage } from './coronilla.page';

const routes: Routes = [
  {
    path: '',
    component: CoronillaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoronillaPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReproductorPage } from './reproductor.page';

const routes: Routes = [
  {
    path: '',
    component: ReproductorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReproductorPageRoutingModule {}

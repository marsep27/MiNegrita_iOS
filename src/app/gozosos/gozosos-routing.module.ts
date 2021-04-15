import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GozososPage } from './gozosos.page';

const routes: Routes = [
  {
    path: '',
    component: GozososPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GozososPageRoutingModule {}

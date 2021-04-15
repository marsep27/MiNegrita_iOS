import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LuminososPage } from './luminosos.page';

const routes: Routes = [
  {
    path: '',
    component: LuminososPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LuminososPageRoutingModule {}

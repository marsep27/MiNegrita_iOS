import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DolorososPage } from './dolorosos.page';

const routes: Routes = [
  {
    path: '',
    component: DolorososPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DolorososPageRoutingModule {}

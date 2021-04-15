import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReproductorPageRoutingModule } from './reproductor-routing.module';

import { ReproductorPage } from './reproductor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReproductorPageRoutingModule
  ],
  declarations: [ReproductorPage]
})
export class ReproductorPageModule {}

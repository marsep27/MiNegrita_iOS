import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroIntencionesPageRoutingModule } from './registro-intenciones-routing.module';

import { RegistroIntencionesPage } from './registro-intenciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroIntencionesPageRoutingModule
  ],
  declarations: [RegistroIntencionesPage]
})
export class RegistroIntencionesPageModule {}

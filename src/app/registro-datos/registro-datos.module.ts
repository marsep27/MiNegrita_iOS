import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroDatosPageRoutingModule } from './registro-datos-routing.module';

import { RegistroDatosPage } from './registro-datos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegistroDatosPageRoutingModule
  ],
  declarations: [RegistroDatosPage]
})
export class RegistroDatosPageModule {}

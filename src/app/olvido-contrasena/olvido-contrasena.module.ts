import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OlvidoContrasenaPageRoutingModule } from './olvido-contrasena-routing.module';

import { OlvidoContrasenaPage } from './olvido-contrasena.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    OlvidoContrasenaPageRoutingModule
  ],
  declarations: [OlvidoContrasenaPage]
})
export class OlvidoContrasenaPageModule {}

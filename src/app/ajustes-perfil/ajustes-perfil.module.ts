import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjustesPerfilPageRoutingModule } from './ajustes-perfil-routing.module';

import { AjustesPerfilPage } from './ajustes-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjustesPerfilPageRoutingModule
  ],
  declarations: [AjustesPerfilPage]
})
export class AjustesPerfilPageModule {}

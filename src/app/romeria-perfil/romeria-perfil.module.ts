import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RomeriaPerfilPageRoutingModule } from './romeria-perfil-routing.module';

import { RomeriaPerfilPage } from './romeria-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RomeriaPerfilPageRoutingModule
  ],
  declarations: [RomeriaPerfilPage]
})
export class RomeriaPerfilPageModule {}

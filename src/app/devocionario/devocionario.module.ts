import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevocionarioPageRoutingModule } from './devocionario-routing.module';

import { DevocionarioPage } from './devocionario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevocionarioPageRoutingModule
  ],
  declarations: [DevocionarioPage]
})
export class DevocionarioPageModule {}

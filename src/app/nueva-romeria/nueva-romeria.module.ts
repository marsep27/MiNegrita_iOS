import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevaRomeriaPageRoutingModule } from './nueva-romeria-routing.module';

import { NuevaRomeriaPage } from './nueva-romeria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NuevaRomeriaPageRoutingModule
  ],
  declarations: [NuevaRomeriaPage]
})
export class NuevaRomeriaPageModule {}

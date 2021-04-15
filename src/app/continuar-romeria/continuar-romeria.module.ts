import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContinuarRomeriaPageRoutingModule } from './continuar-romeria-routing.module';

import { ContinuarRomeriaPage } from './continuar-romeria.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContinuarRomeriaPageRoutingModule
  ],
  declarations: [ContinuarRomeriaPage]
})
export class ContinuarRomeriaPageModule {}

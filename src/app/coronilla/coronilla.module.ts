import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoronillaPageRoutingModule } from './coronilla-routing.module';

import { CoronillaPage } from './coronilla.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoronillaPageRoutingModule
  ],
  declarations: [CoronillaPage]
})
export class CoronillaPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GozososPageRoutingModule } from './gozosos-routing.module';

import { GozososPage } from './gozosos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GozososPageRoutingModule
  ],
  declarations: [GozososPage]
})
export class GozososPageModule {}

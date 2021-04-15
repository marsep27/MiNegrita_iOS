import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LuminososPageRoutingModule } from './luminosos-routing.module';

import { LuminososPage } from './luminosos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LuminososPageRoutingModule
  ],
  declarations: [LuminososPage]
})
export class LuminososPageModule {}

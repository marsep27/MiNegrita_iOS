import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GloriososPageRoutingModule } from './gloriosos-routing.module';

import { GloriososPage } from './gloriosos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GloriososPageRoutingModule
  ],
  declarations: [GloriososPage]
})
export class GloriososPageModule {}

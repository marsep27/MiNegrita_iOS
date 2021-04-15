import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RomeriaPageRoutingModule } from './romeria-routing.module';

import { RomeriaPage } from './romeria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RomeriaPageRoutingModule
  ],
  declarations: [RomeriaPage]
})
export class RomeriaPageModule {}

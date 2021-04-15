import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DolorososPageRoutingModule } from './dolorosos-routing.module';

import { DolorososPage } from './dolorosos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DolorososPageRoutingModule
  ],
  declarations: [DolorososPage]
})
export class DolorososPageModule {}

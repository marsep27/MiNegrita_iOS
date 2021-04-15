import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroExvotosPageRoutingModule } from './registro-exvotos-routing.module';

import { RegistroExvotosPage } from './registro-exvotos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroExvotosPageRoutingModule
  ],
  declarations: [RegistroExvotosPage]
})
export class RegistroExvotosPageModule {}

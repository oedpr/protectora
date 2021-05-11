import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RazasPageRoutingModule } from './razas-routing.module';

import { RazasPage } from './razas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RazasPageRoutingModule
  ],
  declarations: [RazasPage]
})
export class RazasPageModule {}

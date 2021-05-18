import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RazaPageRoutingModule } from './raza-routing.module';

import { RazaPage } from './raza.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RazaPageRoutingModule
  ],
  declarations: [RazaPage]
})
export class RazaPageModule {}

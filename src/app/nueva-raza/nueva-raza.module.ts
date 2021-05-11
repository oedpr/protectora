import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevaRazaPageRoutingModule } from './nueva-raza-routing.module';

import { NuevaRazaPage } from './nueva-raza.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevaRazaPageRoutingModule
  ],
  declarations: [NuevaRazaPage]
})
export class NuevaRazaPageModule {}

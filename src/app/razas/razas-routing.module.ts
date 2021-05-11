import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RazasPage } from './razas.page';

const routes: Routes = [
  {
    path: '',
    component: RazasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RazasPageRoutingModule {}

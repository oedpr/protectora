import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'razas',
    loadChildren: () => import('./razas/razas.module').then( m => m.RazasPageModule)
  },
  {
    path: 'raza',
    children: [
      {
        path: '',
        loadChildren: () => import('./razas/razas.module').then( m => m.RazasPageModule)
      },
      {
        path: ':NombreRaza/:IdRaza',
        loadChildren: () => import('./raza/raza.module').then( m => m.RazaPageModule)
      },
      {
        path: ':NombreRaza/:IdRaza/editar',
        loadChildren: () => import('./editar/raza/raza.module').then( m => m.RazaPageModule)
      },
      {
        path: ':NombreRaza/:IdRaza/:Nombre/:Id',
        loadChildren: () => import('./detalles/detalles.module').then( m => m.DetallesPageModule)
      },
      {
        path: ':NombreRaza/:IdRaza/:Nombre/:Id/editar',
        loadChildren: () => import('./editar/perro/perro.module').then( m => m.PerroPageModule)
      }
    ]
  },
  {
    path: 'agregar',
    loadChildren: () => import('./agregar/agregar.module').then( m => m.AgregarPageModule)
  },
  {
    path: 'nuevaRaza',
    loadChildren: () => import('./nueva-raza/nueva-raza.module').then( m => m.NuevaRazaPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/welcome/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'razas',
    loadChildren: () => import('./pages/home/razas.module').then( m => m.RazasPageModule)
  },
  {
    path: 'raza',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/home/razas.module').then( m => m.RazasPageModule)
      },
      {
        path: ':NombreRaza/:IdRaza',
        loadChildren: () => import('./pages/race/raza.module').then( m => m.RazaPageModule)
      },
      {
        path: ':NombreRaza/:IdRaza/editar',
        loadChildren: () => import('./pages/race/editar/raza.module').then( m => m.RazaPageModule)
      },
      {
        path: ':NombreRaza/:IdRaza/:Nombre/:Id',
        loadChildren: () => import('./pages/dog/detalles.module').then( m => m.DetallesPageModule)
      },
      {
        path: ':NombreRaza/:IdRaza/:Nombre/:Id/editar',
        loadChildren: () => import('./pages/dog/editar/perro.module').then( m => m.PerroPageModule)
      }
    ]
  },
  {
    path: 'agregar',
    loadChildren: () => import('./pages/dog/nuevo/agregar.module').then( m => m.AgregarPageModule)
  },
  {
    path: 'nuevaRaza',
    loadChildren: () => import('./pages/race/nueva/nueva-raza.module').then( m => m.NuevaRazaPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

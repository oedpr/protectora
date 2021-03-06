import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/welcome/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/razas.module').then( m => m.RazasPageModule)
  },
  {
    path: 'raza',
    children: [
      {
        path: 'nueva',
        loadChildren: () => import('./pages/race/new/nueva-raza.module').then( m => m.NuevaRazaPageModule)
      },
      {
        path: ':IdRaza',
        loadChildren: () => import('./pages/race/raza.module').then( m => m.RazaPageModule)
      },
      {
        path: ':IdRaza/editar',
        loadChildren: () => import('./pages/race/edit/raza.module').then( m => m.RazaPageModule)
      }
    ]
  },
  {
    path: 'perro',
    children: [
      {
        path: 'nuevo',
        children: [
          {
            path: '',
            loadChildren: () => import('./pages/dog/new/agregar.module').then( m => m.AgregarPageModule)
          },
          {
            path: ':IdRaza',
            loadChildren: () => import('./pages/dog/new/agregar.module').then( m => m.AgregarPageModule)
          }
        ]
      },
      {
        path: ':Id',
        loadChildren: () => import('./pages/dog/detalles.module').then( m => m.DetallesPageModule)
      },
      {
        path: ':Id/editar',
        loadChildren: () => import('./pages/dog/edit/perro.module').then( m => m.PerroPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

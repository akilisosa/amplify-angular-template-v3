import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'main-page',
        pathMatch: 'full'
      },
      {
        path: 'main-page',
        loadComponent: () => import('./main-page/main-page.component').then( m => m.MainPageComponent)
      },
      {
        path: 'auth',
        loadComponent: () => import('./auth/auth.component').then( m => m.AuthComponent)
      },
];

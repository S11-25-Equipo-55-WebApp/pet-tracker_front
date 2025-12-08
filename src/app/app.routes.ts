import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.routes').then(m => m.authRoutes)
  },
  {
    path: 'pets',
    loadChildren: () =>
      import('./pets/pets-list/pets-list.routes').then(m => m.PETS_ROUTES)
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];


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
    loadChildren: () =>
      import('./pets/pets-detail/pets.details.routes').then(m => m.PETS_ROUTES2)
  },
  {
    path: 'pets/create',
    loadChildren: () =>
      import('./pets/pages/pet-form/pet-form.routes').then(m => m.PETS_CREATE)
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
];
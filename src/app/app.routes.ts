import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./auth/home/home').then(m => m.Home),
  },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes')
  },

  /* {
    path: 'pets',
    loadChildren: () =>
      import('./pets/pets.routes').then(m => m.PETS_ROUTES),
  },

  {
    path: 'health',
    loadChildren: () =>
      import('./health/health.routes').then(m => m.HEALTH_ROUTES),
  },

  {
    path: 'nutrition',
    loadChildren: () =>
      import('./nutrition/nutrition.routes').then(m => m.NUTRITION_ROUTES),
  },

  {
    path: 'reminders',
    loadChildren: () =>
      import('./reminders/reminders.routes').then(m => m.REMINDERS_ROUTES),
  },
 */
  // fallback
  {
    path: '**',
    redirectTo: '',
  },
];

export default appRoutes;

import { Routes } from '@angular/router';
import { PetsDetailsComponent } from './pets.details.component';

export const PETS_ROUTES2: Routes = [
  {
    path: 'pet-details/:id',
    component: PetsDetailsComponent,
    children: [
      {
        path: 'ficha',
        loadComponent: () =>
          import('../../ficha-mascota/fichaMascota.component')
            .then(c => c.FichaMascota)
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../../dashboard/dashboard')
            .then(c => c.DashboardComponent)
      },
      {
        path: 'vaccine',
        loadComponent: () =>
          import('../../vaccine/pages/vaccine-form/vaccine-form')
            .then(c => c.VaccineForm)
      },
      {
        path: 'deworming',
        loadComponent: () =>
          import('../../deworming/pages/dworming-form/dworming-form')
            .then(c => c.DwormingForm)
      },
      {
        path: 'diet',
        loadComponent: () =>
          import('../../diet/pages/diet-form/diet-form')
            .then(c => c.DietForm)
      },
      { path: '', redirectTo: 'ficha', pathMatch: 'full' }
    ]
  }
];

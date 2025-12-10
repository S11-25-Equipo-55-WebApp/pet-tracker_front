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
      { path: '', redirectTo: 'ficha', pathMatch: 'full' }
    ]
  }
];

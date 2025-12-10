import { Routes } from '@angular/router';
import { AuthLayout } from './auth-layout/auth-layout';
import { Home } from './home/home';
import { VaccineForm } from '../vaccine/pages/vaccine-form/vaccine-form';
import { DwormingForm } from '../deworming/pages/dworming-form/dworming-form';
import { DietForm } from '../diet/pages/diet-form/diet-form';
import { ClinicalConsultation } from '../clinicalConsultation/pages/clinical-consultation/clinical-consultation';
import { MedicationForm } from '../medication/pages/medication-form/medication-form';
import { ResetPassword } from './pages/reset-password/reset-password';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: 'home',
        title: 'Home',
        component: Home
      },
      {
        path: 'register',
        title: 'Registro',
        component: Register
      },
      {
        path: 'login',
        title: 'Login',
        component: Login
      },
      {
        path: 'reset-password',
        title: 'Reset password',
        component: ResetPassword
      },
      {
        path: 'vaccine',
        title: 'Vaccine',
        component: VaccineForm
      },
      {
        path: 'diet',
        title: 'Diet',
        component: DietForm
      },
      {
        path: 'dworming',
        title: 'Dworming',
        component: DwormingForm
      },
      {
        path: 'clinical-form',
        title: 'Clinical Form',
        component:ClinicalConsultation
      },
      {
        path: 'medication-form',
        title: "Medication Form",
        component: MedicationForm

      },
      
      {
        path: '**',
        redirectTo: 'home'
      }
    ]
  }
];

export default authRoutes;

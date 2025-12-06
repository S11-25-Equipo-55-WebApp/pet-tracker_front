import { Routes } from '@angular/router';
import { AuthLayout } from './auth-layout/auth-layout';
import { Home } from './home/home';
import { Register } from './pages/register/register';
import { ResetPassword } from './pages/reset-password/reset-password';
import { Login } from './pages/login/login';

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
        path: '**',
        redirectTo: 'home'
      }
    ]
  }
];

export default authRoutes;

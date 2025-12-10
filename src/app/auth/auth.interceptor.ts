import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const noAuthRoutes = [
        '/login',
        '/register',
        '/public'
    ];

    if (noAuthRoutes.some(route => req.url.includes(route))) {
        return next(req);
    }

    const authService = inject(AuthService);
    const token = authService.token();

    console.log('🔐 Auth Interceptor - Token:', token ? 'Present' : 'Missing');
    console.log('🔐 Auth Interceptor - URL:', req.url);

    if (token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('✅ Token añadido al header');
    } else {
        console.log('⚠️ No hay token disponible');
    }

    return next(req);
};
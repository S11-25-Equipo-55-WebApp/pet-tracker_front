import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

    const noAuthRoutes = [
        '/login',
        '/register',
        '/public'
    ];

    if (noAuthRoutes.some(route => req.url.includes(route))) {
        return next(req);
    }

    const token = sessionStorage.getItem("token");

    if (token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return next(req);
};
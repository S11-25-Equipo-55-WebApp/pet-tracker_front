import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

export function authInterceptor(
  req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  // const token = inject(AuthService).token();
  const token = sessionStorage.getItem('usuarioId');
  const newReq = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${token}`),
  });

  console.log('🔥 Interceptor ejecutado:', req.url);
  console.log('Token:', token);

  // Solo agregar el header si tenemos un token
  if (token) {
    const newReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    console.log('✅ Token añadido al header');
    return next(newReq);
  }

  console.log('⚠️ No hay token disponible');
  return next(req);
}

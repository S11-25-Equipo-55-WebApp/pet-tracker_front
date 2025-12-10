import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

export function authInterceptor(
  req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const token = sessionStorage.getItem('token');
  const newReq = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${token}`),
  });

 /* console.log('🔥 Interceptor ejecutado:', req.url); */

  return next(newReq);
}

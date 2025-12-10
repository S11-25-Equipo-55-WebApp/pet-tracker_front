import { computed, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthResponse, User } from '../interfaces/auth-form.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';


type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(sessionStorage.getItem('token'));

  constructor(private readonly authHttp: HttpClient) { }

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') return 'checking';
    return this._user() ? 'authenticated' : 'not-authenticated';
  });

  user = computed<User | null>(() => this._user());
  token = computed<string | null>(() => this._token());


  register(userName: string, nombre: string, apellido: string, email: string, password: string, telefono: string): Observable<boolean> {
    return this.authHttp.post<AuthResponse>(`${baseUrl}/api/Usuario`, { userName, nombre, apellido, email, password, telefono })
      .pipe(
        tap(({ usuario, token }) => this.handleAuthSuccess(usuario, token)),
        map(() => true),
        catchError((err: any) => this.handleAuthError(err))
      );
  }

  login(userName: string, password: string): Observable<boolean> {
    return this.authHttp.post<AuthResponse>(`${baseUrl}/api/Usuario/login`, { userName, password })
      .pipe(
        tap((resp) => {
          const { usuario, token } = resp;
          this._user.set(usuario);
          this.handleAuthSuccess(usuario, token);
          this.getUsuarioId();
          return { usuario, token };
        }),
        map(() => true),
        catchError((err: any) => this.handleAuthError(err))
      );
  }


  reset(passwordActual: string, passwordNuevo: string): Observable<any> {
    const id = this.getUsuarioId();
    if (id === null) {
      console.error('ERROR: No se encontró el ID del usuario logueado.');
      return new Observable(observer => observer.error('Usuario no autenticado'));
    }
    return this.authHttp.post<AuthResponse>(`${baseUrl}/api/Usuario/${id}/CambiarPassword`, { passwordActual, passwordNuevo })
      .pipe(
        tap(({ usuario, token }) => this.handleAuthSuccess(usuario, token)),
        map(() => true),
        catchError((err: any) => this.handleAuthError(err))
      );
  }

  logout(): void {
    this._authStatus.set('not-authenticated');
    this._user.set(null);
    this._token.set(null);
    sessionStorage.removeItem('token');
  }

  private handleAuthSuccess(user: any, token: string): void {
    sessionStorage.setItem('token', token);
    this._user.set(user);
    this._token.set(token);
    this._authStatus.set('authenticated');
  }

  private handleAuthError(err: any): Observable<boolean> {
    this.logout();
    return of(false);
  }

  getUsuarioId(): number | null {
    const UserId = this.user()?.usuarioId!;
    return UserId;
  }

}

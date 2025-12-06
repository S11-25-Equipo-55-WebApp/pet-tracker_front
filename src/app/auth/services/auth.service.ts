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
  private _token = signal<string | null>(localStorage.getItem('token'));

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
      tap(({ user, token }) => this.handleAuthSuccess({ user, token })),
      map(() => true),
      catchError((err: any) => this.handleAuthError(err))
    );
  }

  login(userName: string, password: string): Observable<boolean> {
    console.log(userName, password)
    return this.authHttp.post<AuthResponse>(`${baseUrl}/api/Usuario/login`, { userName, password })
    .pipe(
      tap((resp) => {
        console.log(resp); // TODO: De aquí saco el 'usuarioId', para pasarlo al Formulario de 'reset-password' & consumir el endpoint.
        const { user, token } = resp;
        this.handleAuthSuccess({ user, token })
      }
      ),
      map(() => true),
      catchError((err: any) => this.handleAuthError(err))
    );
  }

  logout(): void {
    this._authStatus.set('not-authenticated');
    this._user.set(null);
    this._token.set(null);
    localStorage.removeItem('token');
  }

  private handleAuthSuccess({user, token}: AuthResponse): void {
    this._user.set(user);
    this._token.set(token);
    this._authStatus.set('authenticated');
    localStorage.setItem('token', token);
  }

  private handleAuthError(err: any): Observable<boolean>{
    this.logout();
    return of(false);
  }

}

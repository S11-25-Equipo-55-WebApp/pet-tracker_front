import { computed, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { AuthResponse, User } from './interfaces/auth-form.interface';


type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(localStorage.getItem('token'));

  constructor(private readonly authHttp: HttpClient) {
    this.initializeAuth();
  }

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') return 'checking';
    return this._user() ? 'authenticated' : 'not-authenticated';
  });

  user = computed<User | null>(() => this._user());
  token = computed<string | null>(() => this._token());

  private initializeAuth(): void {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    // Verificar que tanto el token como el user existan y no sean "undefined"
    if (token && token !== 'undefined' && userStr && userStr !== 'undefined') {
      try {
        const parsedUser = JSON.parse(userStr);
        this._token.set(token);
        this._user.set(parsedUser);
        this._authStatus.set('authenticated');
        console.log('✅ Usuario restaurado desde localStorage:', parsedUser);
      } catch (error) {
        console.error('❌ Error al restaurar usuario:', error);
        this.logout();
      }
    } else {
      console.log('⚠️ No hay sesión previa o datos inválidos');
      this._authStatus.set('not-authenticated');
      // Limpiar cualquier dato corrupto
      if (token === 'undefined') localStorage.removeItem('token');
      if (userStr === 'undefined') localStorage.removeItem('user');
    }
  }

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
      tap(({ user, token }) => this.handleAuthSuccess({ user, token })),
      map(() => true),
      catchError((err: any) => this.handleAuthError(err))
    );
  }

  logout(): void {
    this._authStatus.set('not-authenticated');
    this._user.set(null);
    this._token.set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  private handleAuthSuccess({user, token}: AuthResponse): void {
    this._user.set(user);
    this._token.set(token);
    this._authStatus.set('authenticated');
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    console.log('✅ Usuario autenticado:', user);
  }

  private handleAuthError(err: any): Observable<boolean>{
    console.error('❌ Error en autenticación:', err);
    this.logout();
    return of(false);
  }

}

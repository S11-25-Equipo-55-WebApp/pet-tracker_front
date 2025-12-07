import { computed, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthResponse, User } from '../interfaces/auth-form.interface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';


type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(sessionStorage.getItem('token'));

  private _usuarioId = new BehaviorSubject<number | null>(null);
  public readonly usuarioId$ = this._usuarioId.asObservable();
  private currentUsuarioId: number | null = this.getInitialUsuarioId();

  constructor(private readonly authHttp: HttpClient) {}

  authStatus = computed<AuthStatus>(() => {
    if (this.currentUsuarioId !== null) {
      this._usuarioId.next(this.currentUsuarioId);
    }

    if (this._authStatus() === 'checking') return 'checking';
    return this._user() ? 'authenticated' : 'not-authenticated';
  });

  user = computed<User | null>(() => this._user());
  token = computed<string | null>(() => this._token());


  register(userName: string, nombre: string, apellido: string, email: string, password: string, telefono: string): Observable<boolean> {
    return this.authHttp.post<AuthResponse>(`${baseUrl}/api/Usuario`, { userName, nombre, apellido, email, password, telefono })
    .pipe(
      tap(({ user, token }) => this.handleAuthSuccess(user, token )),
      map(() => true),
      catchError((err: any) => this.handleAuthError(err))
    );
  }

  login(userName: string, password: string): Observable<boolean> {
    return this.authHttp.post<AuthResponse>(`${baseUrl}/api/Usuario/login`, { userName, password })
    .pipe(
      tap((resp) => {
        console.log(resp); // TODO: De aquí saco el 'usuarioId', para pasarlo al Formulario de 'reset-password' & consumir el endpoint.
        const { user, token } = resp;
        this.handleAuthSuccess(user, token )
      }
      ),
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
      tap(({ user, token }) => this.handleAuthSuccess(user, token )),
      map(() => true),
      catchError((err: any) => this.handleAuthError(err))
    );
  }

  private getInitialUsuarioId(): number | null {
  const idString = sessionStorage.getItem('usuario_id');
  if (idString) {
    return parseInt(idString, 10);
  }
  return null;
}

  getUsuarioId(): number | null {
    return this.currentUsuarioId;
  }

  logout(): void {
    this._authStatus.set('not-authenticated');
    this._user.set(null);
    this._token.set(null);
    sessionStorage.removeItem('token');
  }

  private handleAuthSuccess(user: any, token: string): void {
    const id = user.usuarioId;
    this.currentUsuarioId = id;
    this._usuarioId.next(id);

    sessionStorage.setItem('token', token);
    sessionStorage.setItem('usuarioId', id.toString())

    this._user.set(user);
    this._token.set(token);
    this._authStatus.set('authenticated');
  }

  private handleAuthError(err: any): Observable<boolean>{
    this.logout();
    return of(false);
  }

}

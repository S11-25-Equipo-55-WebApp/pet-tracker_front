import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ITypeDeworming } from './interface/typeDeworming.interface';


@Injectable({
    providedIn: 'root'
})
export class TypeDewormingService {

    private apiUrl = 'http://pettrakerapi.runasp.net/api/TipoDesparacitacion';
    constructor(private http: HttpClient) { }

    getTypeDeworming(): Observable<ITypeDeworming[]> {
        return this.http.get<ITypeDeworming[]>(this.apiUrl)
            .pipe(
                catchError(this.manejarError)
            );
    }

    getTypeDewormingById(id: number): Observable<ITypeDeworming> {
        return this.http.get<ITypeDeworming>(`${this.apiUrl}/${id}`)
            .pipe(
                catchError(this.manejarError));
    }

    private manejarError(error: HttpErrorResponse) {
        console.error("Error en la petición:", error);
        return throwError(() => new Error("Error al comunicarse con el servidor"));
    }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ITypeFood } from './interface/typeFood.interface';


@Injectable({
    providedIn: 'root'
})
export class TypeFoodService {

    private apiUrl = 'http://pettrakerapi.runasp.net/api/TipoAlimento';
    constructor(private http: HttpClient) { }

    getTypeFoods(): Observable<ITypeFood[]> {
        return this.http.get<ITypeFood[]>(this.apiUrl)
            .pipe(
                catchError(this.manejarError)
            );
    }

    getTypeFoodById(id: number): Observable<ITypeFood> {
        return this.http.get<ITypeFood>(`${this.apiUrl}/${id}`)
            .pipe(
                catchError(this.manejarError));
    }

    private manejarError(error: HttpErrorResponse) {
        console.error("Error en la petición:", error);
        return throwError(() => new Error("Error al comunicarse con el servidor"));
    }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IRace } from './interface/race.interface';


@Injectable({
    providedIn: 'root'
})
export class RaceService {

    private apiUrl = 'http://pettrakerapi.runasp.net/api/Raza';
    constructor(private http: HttpClient) { }

    getRaces(): Observable<IRace[]> {
        return this.http.get<IRace[]>(this.apiUrl)
            .pipe(
                catchError(this.manejarError)
            );
    }

    getRaceById(id: number): Observable<IRace> {
        return this.http.get<IRace>(`${this.apiUrl}/${id}`)
            .pipe(
                catchError(this.manejarError));
    }

    private manejarError(error: HttpErrorResponse) {
        console.error("Error en la petición:", error);
        return throwError(() => new Error("Error al comunicarse con el servidor"));
    }
}
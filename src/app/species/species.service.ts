import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ISpecie } from './interface/species.interface';


@Injectable({
    providedIn: 'root'
})
export class SpecieService {

    private apiUrl = 'http://pettrakerapi.runasp.net/api/Especie';
    constructor(private http: HttpClient) { }

    getSpecies(): Observable<ISpecie[]> {
        return this.http.get<ISpecie[]>(this.apiUrl)
            .pipe(
                catchError(this.manejarError)
            );
    }

    getSpecieById(id: number): Observable<ISpecie> {
        return this.http.get<ISpecie>(`${this.apiUrl}/${id}`)
            .pipe(
                catchError(this.manejarError));
    }

    private manejarError(error: HttpErrorResponse) {
        console.error("Error en la petición:", error);
        return throwError(() => new Error("Error al comunicarse con el servidor"));
    }
}
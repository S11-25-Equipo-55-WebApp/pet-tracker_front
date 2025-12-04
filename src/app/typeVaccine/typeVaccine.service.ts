import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ITypeVaccine } from './interface/typeVaccine.interface';


@Injectable({
    providedIn: 'root'
})
export class TypeVaccineService {

    private apiUrl = 'http://pettrakerapi.runasp.net/api/TipoVacuna';
    constructor(private http: HttpClient) { }

    getTypeVaccine(): Observable<ITypeVaccine[]> {
        return this.http.get<ITypeVaccine[]>(this.apiUrl)
            .pipe(
                catchError(this.manejarError)
            );
    }

    getTypeVaccineById(id: number): Observable<ITypeVaccine> {
        return this.http.get<ITypeVaccine>(`${this.apiUrl}/${id}`)
            .pipe(
                catchError(this.manejarError));
    }

    private manejarError(error: HttpErrorResponse) {
        console.error("Error en la petición:", error);
        return throwError(() => new Error("Error al comunicarse con el servidor"));
    }
}
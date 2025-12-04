import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ITypeMedication } from './interface/typeMedication.interface';


@Injectable({
    providedIn: 'root'
})
export class TypeMedicationService {

    private apiUrl = 'http://pettrakerapi.runasp.net/api/TipoMedicamento';
    constructor(private http: HttpClient) { }

    getTypeMedications(): Observable<ITypeMedication[]> {
        return this.http.get<ITypeMedication[]>(this.apiUrl)
            .pipe(
                catchError(this.manejarError)
            );
    }

    getTypeMedicationById(id: number): Observable<ITypeMedication> {
        return this.http.get<ITypeMedication>(`${this.apiUrl}/${id}`)
            .pipe(
                catchError(this.manejarError));
    }

    private manejarError(error: HttpErrorResponse) {
        console.error("Error en la petición:", error);
        return throwError(() => new Error("Error al comunicarse con el servidor"));
    }
}
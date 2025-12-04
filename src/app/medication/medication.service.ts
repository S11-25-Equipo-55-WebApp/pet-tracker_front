import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IMedication } from './interface/medication.interface';


@Injectable({
    providedIn: 'root'
})
export class MedicationService {

    private apiUrl = 'http://pettrakerapi.runasp.net/api/Medicacion';
    constructor(private http: HttpClient) { }

    getMedications(): Observable<IMedication[]> {
        return this.http.get<IMedication[]>(this.apiUrl)
            .pipe(
                catchError(this.manejarError)
            );
    }

    getMedicationById(id: number): Observable<IMedication> {
        return this.http.get<IMedication>(`${this.apiUrl}/${id}`)
            .pipe(
                catchError(this.manejarError));
    }

    createMedication(data: IMedication): Observable<IMedication> {
        return this.http.post<IMedication>(this.apiUrl, data)
            .pipe(
                catchError(this.manejarError));
    }

    updateMedication(id: number, data: IMedication): Observable<IMedication> {
        return this.http.put<IMedication>(`${this.apiUrl}/${id}`, data)
            .pipe(
                catchError(this.manejarError)
            );
    }

    deleteMedication(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`)
            .pipe(
                catchError(this.manejarError)
            );
    }

    getMedicationByPetId(id: number): Observable<IMedication[]> {

        const params = new HttpParams().set("id", id.toString());

        return this.http
            .get<IMedication[]>(`${this.apiUrl}/obtener-medicaciones-por-mascota`, { params })
            .pipe(
                catchError(this.manejarError)
            );
    }
    
    getMedicationByconsultationId(id: number): Observable<IMedication[]> {

        const params = new HttpParams().set("id", id.toString());

        return this.http
            .get<IMedication[]>(`${this.apiUrl}/obtener-medicaciones-por-consulta`, { params })
            .pipe(
                catchError(this.manejarError)
            );
    }

    private manejarError(error: HttpErrorResponse) {
        console.error("Error en la petición:", error);
        return throwError(() => new Error("Error al comunicarse con el servidor"));
    }
}
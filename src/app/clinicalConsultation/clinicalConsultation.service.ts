import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IClinicalConsultation } from './interface/clinicalConsultation.interface';


@Injectable({
    providedIn: 'root'
})
export class ClinicalConsultationService {

    private apiUrl = 'http://pettrakerapi.runasp.net/api/ConsultaClinica';
    constructor(private http: HttpClient) { }

    getClinicalConsultation(): Observable<IClinicalConsultation[]> {
        return this.http.get<IClinicalConsultation[]>(this.apiUrl)
            .pipe(
                catchError(this.manejarError)
            );
    }

    getClinicalConsultationById(id: number): Observable<IClinicalConsultation> {
        return this.http.get<IClinicalConsultation>(`${this.apiUrl}/${id}`)
            .pipe(
                catchError(this.manejarError));
    }

    createClinicalConsultation(data: IClinicalConsultation): Observable<IClinicalConsultation> {
        return this.http.post<IClinicalConsultation>(this.apiUrl, data)
            .pipe(
                catchError(this.manejarError));
    }

    updateClinicalConsultation(id: number, data: IClinicalConsultation): Observable<IClinicalConsultation> {
        return this.http.put<IClinicalConsultation>(`${this.apiUrl}/${id}`, data)
            .pipe(
                catchError(this.manejarError)
            );
    }

    deleteClinicalConsultation(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`)
            .pipe(
                catchError(this.manejarError)
            );
    }

    getClinicalConsultationByIdPet(id: number): Observable<IClinicalConsultation[]> {

        const params = new HttpParams().set("id", id.toString());

        return this.http
            .get<IClinicalConsultation[]>(`${this.apiUrl}/obtener-consultas-clinicas-por-mascota`, { params })
            .pipe(
                catchError(this.manejarError)
            );
    }

    private manejarError(error: HttpErrorResponse) {
        console.error("Error en la petición:", error);
        return throwError(() => new Error("Error al comunicarse con el servidor"));
    }
}
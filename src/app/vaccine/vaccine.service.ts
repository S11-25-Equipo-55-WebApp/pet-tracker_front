import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IVaccine } from './interface/vaccine.interface';


@Injectable({
    providedIn: 'root'
})
export class VaccineService {

    private apiUrl = 'http://pettrakerapi.runasp.net/api/Vacuna';
    constructor(private http: HttpClient) { }

    getVaccines(): Observable<IVaccine[]> {
        return this.http.get<IVaccine[]>(this.apiUrl)
            .pipe(
                catchError(this.manejarError)
            );
    }

    getVaccineById(id: number): Observable<IVaccine> {
        return this.http.get<IVaccine>(`${this.apiUrl}/${id}`)
            .pipe(
                catchError(this.manejarError));
    }

    createVaccine(data: IVaccine): Observable<IVaccine> {
        return this.http.post<IVaccine>(this.apiUrl, data)
            .pipe(
                catchError(this.manejarError));
    }

    updateVaccine(id: number, data: IVaccine): Observable<IVaccine> {
        return this.http.put<IVaccine>(`${this.apiUrl}/${id}`, data)
            .pipe(
                catchError(this.manejarError)
            );
    }

    deleteVaccine(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`)
            .pipe(
                catchError(this.manejarError)
            );
    }

    getVaccineByIdPet(id: number): Observable<IVaccine[]> {

        const params = new HttpParams().set("id", id.toString());

        return this.http
            .get<IVaccine[]>(`${this.apiUrl}/obtener-vacunas-por-mascota`, { params })
            .pipe(
                catchError(this.manejarError)
            );
    }

    private manejarError(error: HttpErrorResponse) {
        console.error("Error en la petición:", error);
        return throwError(() => new Error("Error al comunicarse con el servidor"));
    }
}

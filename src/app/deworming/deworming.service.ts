import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IDeworming } from './interface/deworming.interface';


@Injectable({
    providedIn: 'root'
})
export class DewormingService {

    private apiUrl = 'http://pettrakerapi.runasp.net/api/Desparacitacion';
    constructor(private http: HttpClient) { }

    getDewormings(): Observable<IDeworming[]> {
        return this.http.get<IDeworming[]>(this.apiUrl)
            .pipe(
                catchError(this.manejarError)
            );
    }

    getDewormingById(id: number): Observable<IDeworming> {
        return this.http.get<IDeworming>(`${this.apiUrl}/${id}`)
            .pipe(
                catchError(this.manejarError));
    }

    createDeworming(data: IDeworming): Observable<IDeworming> {
        return this.http.post<IDeworming>(this.apiUrl, data)
            .pipe(
                catchError(this.manejarError));
    }

    updateDeworming(id: number, data: IDeworming): Observable<IDeworming> {
        return this.http.put<IDeworming>(`${this.apiUrl}/${id}`, data)
            .pipe(
                catchError(this.manejarError)
            );
    }

    deleteDeworming(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`)
            .pipe(
                catchError(this.manejarError)
            );
    }

    getDewormingByIdPet(id: number): Observable<IDeworming[]> {

        const params = new HttpParams().set("id", id.toString());

        return this.http
            .get<IDeworming[]>(`${this.apiUrl}/obtener-desparacitaciones-por-mascota`, { params })
            .pipe(
                catchError(this.manejarError)
            );
    }

    private manejarError(error: HttpErrorResponse) {
        console.error("Error en la petición:", error);
        return throwError(() => new Error("Error al comunicarse con el servidor"));
    }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IDiet, IDietRequest } from './interface/diet.interface';


@Injectable({
    providedIn: 'root'
})
export class DietService {

    private apiUrl = 'http://pettrakerapi.runasp.net/api/Dieta';
    constructor(private http: HttpClient) { }

    getDiets(): Observable<IDiet[]> {
        return this.http.get<IDiet[]>(this.apiUrl)
            .pipe(
                catchError(this.manejarError)
            );
    }

    getDietById(id: number): Observable<IDiet> {
        return this.http.get<IDiet>(`${this.apiUrl}/${id}`)
            .pipe(
                catchError(this.manejarError));
    }

    createDiet(data: IDiet): Observable<IDiet> {
        return this.http.post<IDiet>(this.apiUrl, data)
            .pipe(
                catchError(this.manejarError));
    }

    updateDiet(id: number, data: IDiet): Observable<IDiet> {
        return this.http.put<IDiet>(`${this.apiUrl}/${id}`, data)
            .pipe(
                catchError(this.manejarError)
            );
    }

    deleteDiet(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`)
            .pipe(
                catchError(this.manejarError)
            );
    }

    getDietByIdPet(id: number): Observable<IDiet[]> {

        const params = new HttpParams().set("id", id.toString());

        return this.http
            .get<IDiet[]>(`${this.apiUrl}/obtener-dietas-por-mascota`, { params })
            .pipe(
                catchError(this.manejarError)
            );
    }

    private manejarError(error: HttpErrorResponse) {
        console.error("Error en la petición:", error);
        return throwError(() => new Error("Error al comunicarse con el servidor"));
    }
}
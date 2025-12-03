import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IMascota } from './interface/mascota.interface';
import { tap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class PetService {

    private apiUrl = 'http://pettrakerapi.runasp.net/api/Mascota';
    constructor(private http: HttpClient) { }

    getPets(): Observable<IMascota[]> {
        return this.http.get<IMascota[]>(this.apiUrl)
            .pipe(
                tap(data => console.log("Respuesta recibida:", data)),
                catchError(this.manejarError)
            );
    }

    getPetById(id: number): Observable<IMascota> {
        return this.http.get<IMascota>(`${this.apiUrl}/${id}`)
            .pipe(
                tap(data => console.log("Respuesta recibida:", data)),
                catchError(this.manejarError));
    }

    createPet(data: IMascota): Observable<IMascota> {
        return this.http.post<IMascota>(this.apiUrl, data)
            .pipe(
                catchError(this.manejarError));
    }

    updatePet(id: number, data: IMascota): Observable<IMascota> {
        return this.http.put<IMascota>(`${this.apiUrl}/${id}`, data)
            .pipe(
                catchError(this.manejarError)
            );
    }

    deletePet(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`)
            .pipe(
                catchError(this.manejarError)
            );
    }

    getPetByIdUser(id: number): Observable<IMascota[]> {

        const params = new HttpParams().set("id", id.toString());

        return this.http
            .get<IMascota[]>(`${this.apiUrl}/obtener-mascota-por-usuario`, { params })
            .pipe(
                tap(res => console.log("Mascotas recibidas:", res)),
                catchError(this.manejarError)
            );
    }

    private manejarError(error: HttpErrorResponse) {
        console.error("Error en la petición:", error);
        return throwError(() => new Error("Error al comunicarse con el servidor"));
    }
}

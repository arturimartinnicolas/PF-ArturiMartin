import {  HttpClient,  HttpErrorResponse,  HttpHeaders,} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  borrarUsuario(id: number): Observable<User> {
    return this.http
      .delete<User>(`${environment.api}/usuarios/${id}`)
      .pipe(catchError(this.manejarError));
  }
  agregarUsuario(usuario: User): Observable<User> {
    return this.http
      .post<User>(`${environment.api}/usuarios/`, usuario, {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          encoding: 'UTF-8',
        }),
      })
      .pipe(catchError(this.manejarError));
  }
  modificarUsuario(id: number, usuario: User): Observable<User> {
    return this.http
      .put<User>(`${environment.api}/usuarios/${id}`, usuario, {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          encoding: 'UTF-8',
        }),
      })
      .pipe(catchError(this.manejarError));
  }
  obtenerUsuarios(): Observable<User[]> {
    return this.http
      .get<User[]>(`${environment.api}/usuarios/`)
      .pipe(catchError(this.manejarError));
  }

  constructor(private http: HttpClient) {}

  private manejarError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.warn('Error en el cliente', error.error.message);
    } else {
      console.warn('Error en el servidor', error.error.message);
    }

    return throwError(() => new Error('Error en la comunicacion HTTP'));
  }
}

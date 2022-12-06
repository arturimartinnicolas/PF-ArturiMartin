import {  HttpClient,  HttpErrorResponse,  HttpHeaders,} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private http: HttpClient) {}

  agregarAlumno(alumno: Student): Observable<Student> {
    return this.http
      .post<Student>(`${environment.api}/alumnos/`, alumno, {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          encoding: 'UTF-8',
        }),
      })
      .pipe(catchError(this.manejarError));
  }

  obtenerAlumnos(): Observable<Student[]> {
    return this.http
      .get<Student[]>(`${environment.api}/alumnos?` + Math.random())
      .pipe(catchError(this.manejarError));
  }

  borrarAlumno(id: number): Observable<Student> {
    return this.http
      .delete<Student>(`${environment.api}/alumnos/${id}`)
      .pipe(catchError(this.manejarError));
  }

  modificarAlumno(id: number, alumno: Student): Observable<Student> {
    return this.http
      .put<Student>(`${environment.api}/alumnos/${id}`, alumno, {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          encoding: 'UTF-8',
        }),
      })
      .pipe(catchError(this.manejarError));
  }

  private manejarError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.warn('Error en el cliente', error.error.message);
    } else {
      console.warn('Error en el servidor', error.error.message);
    }

    return throwError(() => new Error('Error en la comunicacion HTTP'));
  }

  obtenerAlumno(id: number): Observable<Student> {
    return this.http
      .get<Student>(`${environment.api}/alumnos/${id}`)
      .pipe(catchError(this.manejarError));
  }
}

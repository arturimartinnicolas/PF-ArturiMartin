import {  HttpClient,  HttpErrorResponse,  HttpHeaders,} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  obtenerCursos(): Observable<Course[]> {
    return this.http
      .get<Course[]>(`${environment.api}/cursos?` + Math.random())
      .pipe(catchError(this.manejarError));
  }

  agregarCurso(curso: Course): Observable<Course> {
    return this.http
      .post<Course>(`${environment.api}/cursos/`, curso, {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          encoding: 'UTF-8',
        }),
      })
      .pipe(catchError(this.manejarError));
  }

  borrarCurso(id: number): Observable<Course> {
    return this.http
      .delete<Course>(`${environment.api}/cursos/${id}`)
      .pipe(catchError(this.manejarError));
  }

  modificarCurso(id: number, curso: Course): Observable<Course> {
    return this.http
      .put<Course>(`${environment.api}/cursos/${id}`, curso, {
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

  obtenerCurso(id: number): Observable<Course> {
    return this.http
      .get<Course>(`${environment.api}/cursos/${id}`)
      .pipe(catchError(this.manejarError));
  }
}

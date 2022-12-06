import {  HttpClient,  HttpErrorResponse,  HttpHeaders,} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Inscription } from '../models/inscription';

@Injectable({
  providedIn: 'root',
})
export class InscriptionsService {
  borrarInscripcionesPorCurso(id: number) {
    this.http
      .get<Inscription[]>(`${environment.api}/inscripciones?` + Math.random())
      .pipe(catchError(this.manejarError))
      .subscribe((inscripciones: Inscription[]) => {
        let inscripcionesDelCurso = inscripciones.filter(
          (insc) => insc.cursoId == id
        );
        inscripcionesDelCurso.forEach((inscripcionDelCurso) => {
          this.borrarInscripcion(inscripcionDelCurso.id).subscribe();
        });
      });
  }
  borrarInscripcionesPorAlumno(id: number) {
    this.http
      .get<Inscription[]>(`${environment.api}/inscripciones?` + Math.random())
      .pipe(catchError(this.manejarError))
      .subscribe((inscripciones: Inscription[]) => {
        let inscripcionesDelAlumno = inscripciones.filter(
          (insc) => insc.alumnoId == id
        );
        inscripcionesDelAlumno.forEach((inscripcionDelAlumno) => {
          this.borrarInscripcion(inscripcionDelAlumno.id).subscribe();
        });
      });
  }
  constructor(private http: HttpClient) {}

  obtenerInscripciones(): Observable<Inscription[]> {
    return this.http
      .get<Inscription[]>(`${environment.api}/inscripciones?` + Math.random())
      .pipe(catchError(this.manejarError));
  }

  agregarInscripcion(inscripcion: Inscription): Observable<Inscription> {
    return this.http
      .post<Inscription>(`${environment.api}/inscripciones/`, inscripcion, {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          encoding: 'UTF-8',
        }),
      })
      .pipe(catchError(this.manejarError));
  }

  borrarInscripcion(id: number): Observable<Inscription> {
    return this.http
      .delete<Inscription>(`${environment.api}/inscripciones/${id}`)
      .pipe(catchError(this.manejarError));
  }

  modificarInscripcion(
    id: number,
    inscripcion: Inscription
  ): Observable<Inscription> {
    return this.http
      .put<Inscription>(
        `${environment.api}/inscripciones/${id}`,
        inscripcion,
        {
          headers: new HttpHeaders({
            'content-type': 'application/json',
            encoding: 'UTF-8',
          }),
        }
      )
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
}

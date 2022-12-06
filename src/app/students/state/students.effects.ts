import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';
import * as StudentsActions from './students.actions';
import { StudentsService } from '../services/students.service';
import { Student } from '../models/student';

@Injectable()
export class StudentsEffects {
  cargarAlumnos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.cargarAlumnos),
      concatMap(() =>
        this.alumnosService
          .obtenerAlumnos()
          .pipe(
            map((c: Student[]) =>
              StudentsActions.alumnosCargados({ alumnos: c })
            )
          )
      )
    );
  });

  agregarAlumnos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.agregarAlumno),
      concatMap(({ alumno }) =>
        this.alumnosService
          .agregarAlumno(alumno)
          .pipe(map((c: Student) => StudentsActions.cargarAlumnos()))
      )
    );
  });

  editarAlumnos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.editarAlumno),
      concatMap(({ alumno }) =>
        this.alumnosService
          .modificarAlumno(alumno.id, alumno)
          .pipe(map((c: Student) => StudentsActions.cargarAlumnos()))
      )
    );
  });

  eliminarAlumnos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.eliminarAlumno),
      concatMap(({ id }) =>
        this.alumnosService
          .borrarAlumno(id)
          .pipe(map((c: Student) => StudentsActions.cargarAlumnos()))
      )
    );
  });

  constructor(
    private actions$: Actions,
    private alumnosService: StudentsService
  ) {}
}

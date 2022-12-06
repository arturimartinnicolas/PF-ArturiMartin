import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap, map, tap } from 'rxjs/operators';
import * as CoursesActions from './courses.actions';
import { CoursesService } from '../services/courses.service';
import { Course } from '../models/course';

@Injectable()
export class CoursesEffects {
  cargarCursos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.cargarCursos),
      concatMap(() =>
        this.cursosService
          .obtenerCursos()
          .pipe(
            map((c: Course[]) => CoursesActions.cursosCargados({ cursos: c }))
          )
      )
    );
  });

  agregarCursos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.agregarCurso),
      concatMap(({ curso }) =>
        this.cursosService
          .agregarCurso(curso)
          .pipe(map((c: Course) => CoursesActions.cargarCursos()))
      )
    );
  });

  editarCursos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.editarCurso),
      concatMap(({ curso }) =>
        this.cursosService
          .modificarCurso(curso.id, curso)
          .pipe(map((c: Course) => CoursesActions.cargarCursos()))
      )
    );
  });

  eliminarCursos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.eliminarCurso),
      concatMap(({ id }) =>
        this.cursosService
          .borrarCurso(id)
          .pipe(map((c: Course) => CoursesActions.cargarCursos()))
      )
    );
  });

  constructor(
    private actions$: Actions,
    private cursosService: CoursesService
  ) {}
}

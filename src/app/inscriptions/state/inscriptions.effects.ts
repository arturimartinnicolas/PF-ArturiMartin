import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map, tap } from 'rxjs/operators';
import * as InscriptionsActions from './inscriptions.actions';
import { InscriptionsService } from '../services/inscriptions.service';
import { Inscription } from '../models/inscription';

@Injectable()
export class InscriptionsEffects {
  cargarInscripciones$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.cargarInscripciones),

      concatMap(() =>
        this.inscripcionesService
          .obtenerInscripciones()
          .pipe(
            map((c: Inscription[]) =>
              InscriptionsActions.inscripcionesCargadas({ inscripciones: c })
            )
          )
      )
    );
  });

  agregarInscripciones$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.agregarInscripcion),
      concatMap(({ inscripcion }) =>
        this.inscripcionesService
          .agregarInscripcion(inscripcion)
          .pipe(
            map((c: Inscription) =>
            InscriptionsActions.cargarInscripciones()
            )
          )
      )
    );
  });

  editarInscripciones$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.editarInscripcion),
      concatMap(({ inscripcion }) =>
        this.inscripcionesService
          .modificarInscripcion(inscripcion.id, inscripcion)
          .pipe(
            map((c: Inscription) =>
            InscriptionsActions.cargarInscripciones()
            )
          )
      )
    );
  });

  eliminarInscripciones$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.eliminarInscripcion),
      concatMap(({ id }) =>
        this.inscripcionesService
          .borrarInscripcion(id)
          .pipe(
            map((c: Inscription) =>
            InscriptionsActions.cargarInscripciones()
            )
          )
      )
    );
  });

  borrarInscripcionPorCurso$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.borrarInscripcionPorCurso),
      map(({ id }) =>
        this.inscripcionesService.borrarInscripcionesPorCurso(id)
      ),
      map(() => InscriptionsActions.cargarInscripciones())
    );
  });

  borrarInscripcionPorAlumno$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.borrarInscripcionPorAlumno),
      map(({ id }) =>
        this.inscripcionesService.borrarInscripcionesPorAlumno(id)
      ),
      map(() => InscriptionsActions.cargarInscripciones())
    );
  });

  constructor(
    private actions$: Actions,
    private inscripcionesService: InscriptionsService
  ) {}
}

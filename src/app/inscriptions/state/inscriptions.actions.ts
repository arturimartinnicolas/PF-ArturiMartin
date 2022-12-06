import { createAction, props } from '@ngrx/store';
import { Inscription } from '../models/inscription';

export const cargarInscripciones = createAction(
  '[Inscripciones] Cargar Inscripciones'
);

export const inscripcionesCargadas = createAction(
  '[Inscripciones] Inscripciones cargadas',
  props<{ inscripciones: Inscription[] }>()
);

export const agregarInscripcion = createAction(
  '[Inscripciones] Agregar inscripcion',
  props<{ inscripcion: Inscription }>()
);

export const editarInscripcion = createAction(
  '[Inscripciones] Editar inscripcion',
  props<{ inscripcion: Inscription }>()
);

export const eliminarInscripcion = createAction(
  '[Inscripciones] Eliminar inscripcion',
  props<{ id: number }>()
);
export const borrarInscripcionPorCurso = createAction(
  '[Inscripciones] Eliminar inscripciones por curso',
  props<{ id: number }>()
);
export const borrarInscripcionPorAlumno = createAction(
  '[Inscripciones] Eliminar inscripciones por alumno',
  props<{ id: number }>()
);

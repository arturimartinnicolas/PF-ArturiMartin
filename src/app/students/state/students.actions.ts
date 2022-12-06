import { createAction, props } from '@ngrx/store';
import { Student } from '../models/student';

export const cargarAlumnos = createAction('[Alumnos] Cargar Alumnos');

export const alumnosCargados = createAction(
  '[Alumnos] Alumnos cargados',
  props<{ alumnos: Student[] }>()
);

export const agregarAlumno = createAction(
  '[Alumnos] Agregar alumno',
  props<{ alumno: Student }>()
);

export const editarAlumno = createAction(
  '[Alumnos] Editar alumno',
  props<{ alumno: Student }>()
);

export const eliminarAlumno = createAction(
  '[Alumnos] Eliminar alumno',
  props<{ id: number }>()
);

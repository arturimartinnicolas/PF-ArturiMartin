import { createAction, props } from '@ngrx/store';
import { Course } from '../models/course';

export const cargarCursos = createAction('[Cursos] Cargar Cursos');

export const cursosCargados = createAction(
  '[Cursos] Cursos cargados',
  props<{ cursos: Course[] }>()
);

export const agregarCurso = createAction(
  '[Cursos] Agregar curso',
  props<{ curso: Course }>()
);

export const editarCurso = createAction(
  '[Cursos] Editar curso',
  props<{ curso: Course }>()
);

export const eliminarCurso = createAction(
  '[Cursos] Eliminar curso',
  props<{ id: number }>()
);

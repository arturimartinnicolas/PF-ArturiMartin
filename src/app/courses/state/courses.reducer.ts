import { Action, createReducer, on } from '@ngrx/store';
import { CourseState } from '../models/course.state';
import * as CoursesActions from './courses.actions';

export const coursesFeatureKey = 'cursos';

export const estadoInicial: CourseState = {
  cargando: false,
  cursos: [],
};

export const coursesReducer = createReducer(
  estadoInicial,

  on(CoursesActions.cargarCursos, (state) => {
    return { ...state, cargando: true };
  }),
  on(CoursesActions.cursosCargados, (state, { cursos }) => {
    return { ...state, cargando: false, cursos: cursos };
  }),
  on(CoursesActions.agregarCurso, (state, { curso }) => {
    return state;
  }),
  on(CoursesActions.editarCurso, (state, { curso }) => {
    return state;
  }),
  on(CoursesActions.eliminarCurso, (state, { id }) => {
    return state;
  })
);

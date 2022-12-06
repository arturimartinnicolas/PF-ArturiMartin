import { createReducer, on } from '@ngrx/store';
import { StudentState } from '../models/studentstate';
import * as StudentsActions from './students.actions';

export const studentsFeatureKey = 'alumnos';

export const estadoInicial: StudentState = {
  cargando: false,
  alumnos: [],
};

export const studentsReducer = createReducer(
  estadoInicial,

  on(StudentsActions.cargarAlumnos, (state) => state),

  on(StudentsActions.cargarAlumnos, (state) => {
    return { ...state, cargando: true };
  }),
  on(StudentsActions.alumnosCargados, (state, { alumnos }) => {
    return { ...state, cargando: false, alumnos: alumnos };
  }),
  on(StudentsActions.agregarAlumno, (state, { alumno }) => {
    return state;
  }),
  on(StudentsActions.editarAlumno, (state, { alumno }) => {
    return state;
  }),
  on(StudentsActions.eliminarAlumno, (state, { id }) => {
    return state;
  })
);

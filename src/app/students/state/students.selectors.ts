import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudentState } from '../models/studentstate';
import * as fromAlumnos from './students.reducer';

export const selectStudentsState = createFeatureSelector<StudentState>(
  fromAlumnos.studentsFeatureKey
);

export const selectAlumnosCargando = createSelector(
  selectStudentsState,
  (state) => state.cargando
);

export const selectAlumnos = createSelector(
  selectStudentsState,
  (state) => state.alumnos
);

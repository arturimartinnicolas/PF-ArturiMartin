import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from '../models/course.state';
import * as fromCursos from './courses.reducer';

export const selectCoursesState = createFeatureSelector<CourseState>(
  fromCursos.coursesFeatureKey
);

export const selectCoursesCargando = createSelector(
  selectCoursesState,
  (state) => state.cargando
);

export const selectCourses = createSelector(
  selectCoursesState,
  (state) => state.cursos
);

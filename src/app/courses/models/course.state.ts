import { Course } from './course';

export interface CourseState {
  cargando: boolean;
  cursos: Course[];
}

import { Student } from './student';

export interface StudentState {
  cargando: boolean;
  alumnos: Student[];
}

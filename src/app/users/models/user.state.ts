import { User } from './user';

export interface UserState {
  cargando: boolean;
  usuarios: User[];
}

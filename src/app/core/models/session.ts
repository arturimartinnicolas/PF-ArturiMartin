import { User } from '../../users/models/user';

export interface Session {
  sesionActiva: boolean;
  usuarioActivo?: User;
  menuActivo?: string;
}

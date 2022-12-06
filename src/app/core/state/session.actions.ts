import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/users/models/user';

export const cargarSesion = createAction('[Sesion] Cargar Sesion');

export const cargarUsuarioActivo = createAction(
  '[Sesion] Cargar Usuario Activo',
  props<{ usuarioActivo: User }>()
);

export const cargarMenuActivo = createAction(
  '[Sesion] Cargar Menu Activo',
  props<{ menuActivo: string }>()
);

export const borrarSession = createAction('[Sesion] Borrar Sesion');

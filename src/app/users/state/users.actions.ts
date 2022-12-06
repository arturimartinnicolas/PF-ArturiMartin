import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';

export const cargarUsuarios = createAction('[Usuarios] Cargar Usuarios');

export const usuariosCargados = createAction(
  '[Usuarios] Usuarios cargados',
  props<{ usuarios: User[] }>()
);

export const agregarUsuario = createAction(
  '[Usuarios] Agregar usuario',
  props<{ usuario: User }>()
);

export const editarUsuario = createAction(
  '[Usuarios] Editar usuario',
  props<{ usuario: User }>()
);

export const eliminarUsuario = createAction(
  '[Usuarios] Eliminar usuario',
  props<{ id: number }>()
);

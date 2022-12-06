import { Action, createReducer, on } from '@ngrx/store';
import { UserState } from '../models/user.state';
import * as UsersActions from './users.actions';

export const usersFeatureKey = 'usuarios';

export const estadoInicial: UserState = {
  cargando: false,
  usuarios: [],
};

export const usersReducer = createReducer(
  estadoInicial,

  on(UsersActions.cargarUsuarios, (state) => {
    return { ...state, cargando: true };
  }),
  on(UsersActions.usuariosCargados, (state, { usuarios }) => {
    return { ...state, cargando: false, usuarios: usuarios };
  }),
  on(UsersActions.agregarUsuario, (state, { usuario }) => {
    return state;
  }),
  on(UsersActions.editarUsuario, (state, { usuario }) => {
    return state;
  }),
  on(UsersActions.eliminarUsuario, (state, { id }) => {
    return state;
  })
);

import { Action, createReducer, on } from '@ngrx/store';
import { Session } from '../models/session';
import * as SessionActions from './session.actions';

export const sessionFeatureKey = 'sesion';

export const estadoInicial: Session = {
  sesionActiva: false,
};

export const reducer = createReducer(
  estadoInicial,

  on(SessionActions.cargarSesion, (state) => state),
  on(SessionActions.cargarUsuarioActivo, (state, { usuarioActivo }) => {
    return { ...state, sesionActiva: true, usuarioActivo: usuarioActivo };
  }),
  on(SessionActions.cargarMenuActivo, (state, { menuActivo }) => {
    return { ...state, menuActivo: menuActivo };
  }),
  on(SessionActions.borrarSession, (state) => {
    return estadoInicial;
  })
);

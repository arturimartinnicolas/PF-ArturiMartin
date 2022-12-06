import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../models/user.state';
import * as fromUsuarios from './users.reducer';

export const selectUsersState = createFeatureSelector<UserState>(
  fromUsuarios.usersFeatureKey
);

export const selectUsuariosCargando = createSelector(
  selectUsersState,
  (state) => state.cargando
);

export const selectUsuarios = createSelector(
  selectUsersState,
  (state) => state.usuarios
);

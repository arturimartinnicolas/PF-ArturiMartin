import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';
import * as UsersActions from './users.actions';
import { User } from '../models/user';
import { UsersService } from '../service/users.service';

@Injectable()
export class UsersEffects {
  cargarUsuarios$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.cargarUsuarios),
      concatMap(() =>
        this.usuariosService
          .obtenerUsuarios()
          .pipe(
            map((c: User[]) =>
              UsersActions.usuariosCargados({ usuarios: c })
            )
          )
      )
    );
  });

  agregarUsuarios$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.agregarUsuario),
      concatMap(({ usuario }) =>
        this.usuariosService
          .agregarUsuario(usuario)
          .pipe(map((c: User) => UsersActions.cargarUsuarios()))
      )
    );
  });

  editarUsuarios$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.editarUsuario),
      concatMap(({ usuario }) =>
        this.usuariosService
          .modificarUsuario(usuario.id, usuario)
          .pipe(map((c: User) => UsersActions.cargarUsuarios()))
      )
    );
  });

  eliminarUsuarios$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.eliminarUsuario),
      concatMap(({ id }) =>
        this.usuariosService
          .borrarUsuario(id)
          .pipe(map((c: User) => UsersActions.cargarUsuarios()))
      )
    );
  });

  constructor(
    private actions$: Actions,
    private usuariosService: UsersService
  ) {}
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Session } from 'src/app/core/models/session';
import { cargarUsuarioActivo } from 'src/app/core/state/session.actions';
import { User } from 'src/app/users/models/user';
import { UserState } from 'src/app/users/models/user.state';
import { cargarUsuarios } from 'src/app/users/state/users.actions';
import { selectUsuarios } from 'src/app/users/state/users.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formulario!: FormGroup;
  sesion$!: Observable<Session>;
  hide = true;
  constructor(
    private storeSession: Store<Session>,
    private storeUsuarios: Store<UserState>,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) {
    this.storeUsuarios.dispatch(cargarUsuarios());
  }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      usuario: new FormControl('', [Validators.required]),
      clave: new FormControl('', []),
    });
  }

  login() {
    const usuarioForm = this.formulario.get('usuario')?.value;
    const claveForm = this.formulario.get('clave')?.value;
    this.storeUsuarios
      .select(selectUsuarios)
      .subscribe({
        next: (usuarios: User[]) => {
          let usuarioValido = usuarios.filter(
            (usuarioBase) =>
              usuarioBase.usuario == usuarioForm &&
              usuarioBase.clave == claveForm
          );
          if (usuarioValido.length > 0) {
            this.storeSession.dispatch(
              cargarUsuarioActivo({ usuarioActivo: usuarioValido[0] })
            );
            this.router.navigate(['home']);
          } else {
            this.openSnackBar(
              'Usuario o clave inválida',
              'Login cancelado',
              3000
            );
          }
        },
      })
      .unsubscribe();
  }

  openSnackBar(message: string, action: string, duration: number) {
    if (duration && duration > 0) {
      this.matSnackBar.open(message, action, { duration: duration });
    } else {
      this.matSnackBar.open(message, action);
    }
  }
}

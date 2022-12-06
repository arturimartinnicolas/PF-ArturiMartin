import {  AfterViewInit,  Component,  OnDestroy,  OnInit,  ViewChild,} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Session } from 'src/app/core/models/session';
import { cargarMenuActivo } from 'src/app/core/state/session.actions';
import { User} from '../../models/user';
import { UserState } from '../../models/user.state';
import {  agregarUsuario,  cargarUsuarios,  editarUsuario,  eliminarUsuario,} from '../../state/users.actions';
import { selectUsuarios } from '../../state/users.selectors';
import { DataUserDialogComponent } from '../data-user-dialog/data-user-dialog.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  subscripcion!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  columnas: string[] = ['usuario', 'esAdmin', 'acciones'];
  dataSource: MatTableDataSource<User> =
    new MatTableDataSource<User>();

  constructor(
    private storeUsuarios: Store<UserState>,
    private storeSesion: Store<Session>,
    private dialog: MatDialog
  ) {}

  ngOnDestroy(): void {
    if (this.subscripcion) {
      this.subscripcion.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.storeSesion.dispatch(cargarMenuActivo({ menuActivo: 'Usuarios' }));
    this.actualizarLista();

    this.dataSource.filterPredicate = function (
      usuario: User,
      filtro: string
    ) {
      return usuario.usuario
        .toLocaleLowerCase()
        .includes(filtro.toLocaleLowerCase());
    };
  }

  actualizarLista() {
    this.subscripcion = this.storeUsuarios.select(selectUsuarios).subscribe({
      next: (usuarios: User[]) => {
        this.dataSource.data = usuarios;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editar(id: number) {
    let position = this.dataSource.data.findIndex(
      (usuario) => usuario.id == id
    );
    let usuarioData = this.dataSource.data[position];

    let dialog = this.dialog.open(DataUserDialogComponent, {
      width: '50%',
      height: '80%',
      data: usuarioData,
    });
    dialog.beforeClosed().subscribe((res) => {
      if (res) {
        const newData: User = {
          ...res,
          id: id,
        };
        this.storeUsuarios.dispatch(editarUsuario({ usuario: newData }));
      }
    });
  }

  borrar(id: number) {
    this.storeUsuarios.dispatch(eliminarUsuario({ id: id }));
  }
  openDialog() {
    let dialog = this.dialog.open(DataUserDialogComponent, {
      width: '50%',
      height: '80%',
    });

    dialog.beforeClosed().subscribe((res) => {
      if (res) {
        let newId: number = this.obtenerProximoId();
        let newData = {
          ...res,
          id: newId,
        };
        this.storeUsuarios.dispatch(agregarUsuario({ usuario: newData }));
      }
    });
  }

  filtrar(event: Event) {
    const valorFiltro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorFiltro.trim().toLowerCase();
  }

  obtenerProximoId() {
    let maxId: number = 0;
    this.dataSource.data.forEach((usuario) => {
      if (usuario.id > maxId) {
        maxId = usuario.id;
      }
    });
    return maxId + 1;
  }
}

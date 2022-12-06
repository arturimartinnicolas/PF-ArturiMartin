import {  AfterViewInit,  Component,  OnDestroy,  OnInit,  ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { Student } from '../../models/student';
import { DataStudentDialogComponent } from '../data-student-dialog/data-student-dialog.component';
import { ViewStudentDialogComponent } from '../view-student-dialog/view-student-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Session } from 'src/app/core/models/session';
import { Store } from '@ngrx/store';
import { cargarMenuActivo } from 'src/app/core/state/session.actions';
import { selectSession } from 'src/app/core/state/session.selectors';
import { StudentState } from '../../models/studentstate';
import {  agregarAlumno,  cargarAlumnos,  editarAlumno,  eliminarAlumno,} from '../../state/students.actions';
import { selectAlumnos } from '../../state/students.selectors';
import { InscriptionState } from 'src/app/inscriptions/models/inscription.state';
import { borrarInscripcionPorAlumno } from 'src/app/inscriptions/state/inscriptions.actions';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css'],
})
export class StudentsListComponent implements OnInit, OnDestroy, AfterViewInit {
  subscripcion!: Subscription;
  sesion$!: Observable<Session>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  columnas: string[] = [    'nombre',    'edad',    'genero',    'fechaDeIngreso',    'acciones'  ];
  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>();

  constructor(
    private storeAlumnos: Store<StudentState>,
    private storeInscripciones: Store<InscriptionState>,
    private storeSesion: Store<Session>,
    private dialog: MatDialog
  ) {
    this.storeAlumnos.dispatch(cargarAlumnos());
  }

  ngOnDestroy(): void {
    if (this.subscripcion) {
      this.subscripcion.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.storeSesion.dispatch(cargarMenuActivo({ menuActivo: 'Alumnos' }));
    this.sesion$ = this.storeSesion.select(selectSession);
    this.actualizarLista();

    this.dataSource.filterPredicate = function (
      alumno: Student,
      filtro: string
    ) {
      return (
        alumno.nombre
          .toLocaleLowerCase()
          .includes(filtro.toLocaleLowerCase()) ||
        alumno.apellido.toLocaleLowerCase().includes(filtro.toLocaleLowerCase())
      );
    };
  }

  actualizarLista() {
    this.subscripcion = this.storeAlumnos.select(selectAlumnos).subscribe({
      next: (alumnos: Student[]) => {
        this.dataSource.data = alumnos;
      },
      error: (error) => {
        alert('hubo un error al obtener los alumnos: ' + error.message);
      },
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editar(id: number) {
    let position = this.dataSource.data.findIndex((alumno) => alumno.id == id);
    let alumnoData = this.dataSource.data[position];

    let dialog = this.dialog.open(DataStudentDialogComponent, {
      width: '50%',
      height: '80%',
      data: alumnoData,
    });
    dialog.beforeClosed().subscribe((res) => {
      if (res) {
        const newData: Student = {
          ...res,
          id: id,
        };
        this.storeAlumnos.dispatch(editarAlumno({ alumno: newData }));
      }
    });
  }
  verDetalle(id: number) {
    {
      let position = this.dataSource.data.findIndex(
        (alumno) => alumno.id == id
      );
      let alumnoData = this.dataSource.data[position];

      let dialog = this.dialog.open(ViewStudentDialogComponent, {
        width: '80%',
        height: '80%',
        data: alumnoData,
      });
    }
  }

  borrar(id: number) {
    this.storeAlumnos.dispatch(eliminarAlumno({ id }));
    this.storeInscripciones.dispatch(borrarInscripcionPorAlumno({ id }));
  }
  openDialog() {
    let dialog = this.dialog.open(DataStudentDialogComponent, {
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
        newData.fechaDeIngreso = new Date();
        this.storeAlumnos.dispatch(agregarAlumno({ alumno: newData }));
      }
    });
  }

  filtrar(event: Event) {
    const valorFiltro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorFiltro.trim().toLowerCase();
  }

  obtenerProximoId() {
    let maxId: number = 0;
    this.dataSource.data.forEach((alumno) => {
      if (alumno.id > maxId) {
        maxId = alumno.id;
      }
    });
    return maxId + 1;
  }
}

import {  AfterViewInit,  Component,  OnDestroy,  OnInit,  ViewChild,} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Inscription } from '../../models/inscription';
import { InscriptionWName } from '../../models/InscriptionWName';
import { DataInscriptionDialogComponent } from '../data-inscription-dialog/data-inscription-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Course } from 'src/app/courses/models/course';
import { Student } from 'src/app/students/models/student';
import { Session } from 'src/app/core/models/session';
import { Store } from '@ngrx/store';
import { cargarMenuActivo } from 'src/app/core/state/session.actions';
import { CourseState } from 'src/app/courses/models/course.state';
import { InscriptionState } from '../../models/inscription.state';
import { cargarCursos } from 'src/app/courses/state/courses.actions';
import { selectCourses } from 'src/app/courses/state/courses.selectors';
import { selectInscriptions } from '../../state/inscriptions.selectors';
import {  agregarInscripcion,  cargarInscripciones,  editarInscripcion,  eliminarInscripcion} from '../../state/inscriptions.actions';
import { StudentState } from 'src/app/students/models/studentstate';
import { selectAlumnos } from 'src/app/students/state/students.selectors';
import { cargarAlumnos } from 'src/app/students/state/students.actions';
import { selectSession } from 'src/app/core/state/session.selectors';

@Component({
  selector: 'app-inscriptions-list',
  templateUrl: './inscriptions-list.component.html',
  styleUrls: ['./inscriptions-list.component.css'],
})
export class InscriptionsListComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  subscripcion!: Subscription;
  subscripcionAlumnos!: Subscription;
  cursos!: Course[];
  alumnos!: Student[];
  sesion$!: Observable<Session>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  columnas: string[] = [    'cursoId',    'cursoNombre',    'alumnoId',    'alumnoNombre',    'acciones',  ];
  dataSource: MatTableDataSource<InscriptionWName> =
    new MatTableDataSource<InscriptionWName>();
  formulario!: FormGroup;

  constructor(
    private storeInscripciones: Store<InscriptionState>,
    private storeCursos: Store<CourseState>,
    private storeAlumnos: Store<StudentState>,
    private storeSesion: Store<Session>,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar
  ) {
    this.storeCursos.dispatch(cargarCursos());
    this.storeAlumnos.dispatch(cargarAlumnos());
    this.storeInscripciones.dispatch(cargarInscripciones());
  }

  ngOnDestroy(): void {
    if (this.subscripcion) {
      this.subscripcion.unsubscribe();
    }
    if (this.subscripcionAlumnos) {
      this.subscripcionAlumnos.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.sesion$ = this.storeSesion.select(selectSession);
    this.storeSesion.dispatch(
      cargarMenuActivo({ menuActivo: 'Inscripciones' })
    );
    this.formulario = this.formBuilder.group({
      filtroCurso: ['', []],
      filtroAlumno: ['', []],
    });

    this.actualizarLista();
  }

  actualizarLista() {
    this.subscripcion = this.storeCursos
      .select(selectCourses)
      .subscribe((cursos: Course[]) => {
        this.cursos = cursos;
        this.subscripcionAlumnos = this.storeAlumnos
          .select(selectAlumnos)
          .subscribe((alumnos: Student[]) => {
            this.alumnos = alumnos;

            this.subscripcion = this.storeInscripciones
              .select(selectInscriptions)
              .subscribe({
                next: (inscripciones: Inscription[]) => {
                  let data: InscriptionWName[] = [];
                  inscripciones.forEach((inscripcion) => {
                    let curso = this.cursos.find(
                      (curso2) => curso2.id == inscripcion.cursoId
                    );
                    let alumno = this.alumnos.find(
                      (alumno2) => alumno2.id == inscripcion.alumnoId
                    );
                    if (alumno && curso) {
                      data.push({
                        id: inscripcion.id,
                        cursoId: inscripcion.cursoId,
                        cursoNombre: curso!.nombre,
                        alumnoId: inscripcion.alumnoId,
                        alumnoNombre: alumno?.apellido + ' ' + alumno?.nombre,
                      });
                    }
                  });
                  this.dataSource.data = data;
                },
                error: (error) => {
                  console.error(error);
                },
              });
          });
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editar(id: number) {
    let position = this.dataSource.data.findIndex(
      (inscripcion) => inscripcion.id == id
    );
    let inscripcionData = this.dataSource.data[position];

    let dialog = this.dialog.open(DataInscriptionDialogComponent, {
      width: '50%',
      height: '80%',
      data: inscripcionData,
    });

    dialog.beforeClosed().subscribe((res) => {
      if (res) {
        const newData: Inscription = {
          ...res,
          id: id,
        };
        this.storeInscripciones.select(selectInscriptions).subscribe({
          next: (inscripciones: Inscription[]) => {
            let existeInsc = false;
            inscripciones.forEach((inscripcion) => {
              if (
                inscripcion.alumnoId == res.alumnoId &&
                inscripcion.cursoId == res.cursoId
              ) {
                existeInsc = true;
              }
            });
            if (!existeInsc) {
              this.storeInscripciones.dispatch(
                editarInscripcion({ inscripcion: newData })
              );
            } else {
              this.openSnackBar(
                'Ya existe esta subscripción',
                'Cancelado',
                3000
              );
            }
          },
        });
      }
    });
  }

  borrar(id: number) {
    this.storeInscripciones.dispatch(eliminarInscripcion({ id }));
  }
  openDialog() {
    let dialog = this.dialog.open(DataInscriptionDialogComponent, {
      width: '50%',
      height: '80%',
    });

    dialog.beforeClosed().subscribe((res) => {
      if (res) {
        this.storeInscripciones
          .select(selectInscriptions)
          .subscribe({
            next: (inscripciones: Inscription[]) => {
              let existeInsc = false;
              inscripciones.forEach((inscripcion) => {
                if (
                  inscripcion.alumnoId == res.alumnoId &&
                  inscripcion.cursoId == res.cursoId
                ) {
                  existeInsc = true;
                }
              });
              if (!existeInsc) {
                let newId: number = this.obtenerProximoId();
                let newData = {
                  ...res,
                  id: newId,
                };
                this.storeInscripciones.dispatch(
                  agregarInscripcion({ inscripcion: newData })
                );
              } else {
                this.openSnackBar(
                  'Ya existe esta subscripción',
                  'Cancelado',
                  3000
                );
              }
            },
          })
          .unsubscribe();
      }
    });
  }

  filtrarCurso(event: Event) {
    const filtroAlum = this.formulario.controls['filtroAlumno'].value
      .trim()
      .toLocaleLowerCase();
    const valorFiltro = (event.target as HTMLInputElement).value
      .trim()
      .toLocaleLowerCase();
    if (valorFiltro == '' && filtroAlum != '') {
      this.dataSource.filterPredicate = function (
        inscripcion: InscriptionWName,
        filtro: string
      ) {
        return inscripcion.alumnoNombre.toLocaleLowerCase().includes(filtro);
      };
      this.dataSource.filter = filtroAlum;
    } else {
      this.dataSource.filterPredicate = function (
        inscripcion: InscriptionWName,
        filtro: string
      ) {
        return (
          inscripcion.cursoNombre.toLocaleLowerCase().includes(filtro) &&
          inscripcion.alumnoNombre.toLocaleLowerCase().includes(filtroAlum)
        );
      };
      this.dataSource.filter = valorFiltro;
    }
  }

  filtrarAlumno(event: Event) {
    const filtroCurs = this.formulario.controls['filtroCurso'].value
      .trim()
      .toLocaleLowerCase();

    const valorFiltro = (event.target as HTMLInputElement).value
      .trim()
      .toLocaleLowerCase();
    if (valorFiltro == '' && filtroCurs != '') {
      this.dataSource.filterPredicate = function (
        inscripcion: InscriptionWName,
        filtro: string
      ) {
        return inscripcion.cursoNombre.toLocaleLowerCase().includes(filtro);
      };
      this.dataSource.filter = filtroCurs;
    } else {
      this.dataSource.filterPredicate = function (
        inscripcion: InscriptionWName,
        filtro: string
      ) {
        return (
          inscripcion.cursoNombre.toLocaleLowerCase().includes(filtroCurs) &&
          inscripcion.alumnoNombre.toLocaleLowerCase().includes(filtro)
        );
      };
      this.dataSource.filter = valorFiltro;
    }
  }

  openSnackBar(message: string, action: string, duration: number) {
    if (duration && duration > 0) {
      this.matSnackBar.open(message, action, { duration: duration });
    } else {
      this.matSnackBar.open(message, action);
    }
  }

  obtenerProximoId() {
    let maxId: number = 0;
    this.dataSource.data.forEach((inscripcion) => {
      if (inscripcion.id > maxId) {
        maxId = inscripcion.id;
      }
    });
    return maxId + 1;
  }
}
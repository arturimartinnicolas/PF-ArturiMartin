import {  AfterViewInit,  Component,  OnDestroy,  OnInit,  ViewChild,} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { Course } from '../../models/course';
import { DataCourseDialogComponent } from '../data-course-dialog/data-course-dialog.component';
import { ViewCourseDialogComponent } from '../view-course-dialog/view-course-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Session } from 'src/app/core/models/session';
import { Store } from '@ngrx/store';
import { CourseState } from '../../models/course.state';
import { selectCourses } from '../../state/courses.selectors';
import {  agregarCurso,  cargarCursos,  editarCurso,  eliminarCurso,} from '../../state/courses.actions';
import { selectSession } from 'src/app/core/state/session.selectors';
import { cargarMenuActivo } from 'src/app/core/state/session.actions';
import { InscriptionState } from 'src/app/inscriptions/models/inscription.state';
import { borrarInscripcionPorCurso } from 'src/app/inscriptions/state/inscriptions.actions';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
})
export class CoursesListComponent implements OnInit, OnDestroy, AfterViewInit {
  subscripcion!: Subscription;
  sesion$!: Observable<Session>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  columnas: string[] = [    'nombre',    'comision',    'profesor',    'fechaInicio',    'fechaFin',    'inscripcionAbierta',    'acciones',  ];
  dataSource: MatTableDataSource<Course> = new MatTableDataSource<Course>();

  constructor(
    private storeCursos: Store<CourseState>,
    private storeInscripciones: Store<InscriptionState>,
    private storeSesion: Store<Session>,
    private dialog: MatDialog
  ) {
    this.storeCursos.dispatch(cargarCursos());
  }
  ngOnDestroy(): void {
    if (this.subscripcion) {
      this.subscripcion.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.storeSesion.dispatch(cargarMenuActivo({ menuActivo: 'Cursos' }));
    this.sesion$ = this.storeSesion.select(selectSession);
    this.actualizarLista();

    this.dataSource.filterPredicate = function (
      curso: Course,
      filtro: string
    ) {
      return (
        curso.nombre.toLocaleLowerCase().includes(filtro.toLocaleLowerCase()) ||
        curso.comision
          .toLocaleLowerCase()
          .includes(filtro.toLocaleLowerCase()) ||
        curso.profesor.toLocaleLowerCase().includes(filtro.toLocaleLowerCase())
      );
    };
  }

  actualizarLista() {
    this.subscripcion = this.storeCursos.select(selectCourses).subscribe({
      next: (cursos: Course[]) => {
        this.dataSource.data = cursos;
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editar(id: number) {
    let position = this.dataSource.data.findIndex((curso) => curso.id == id);
    let cursoData = this.dataSource.data[position];

    let dialog = this.dialog.open(DataCourseDialogComponent, {
      width: '50%',
      height: '80%',
      data: cursoData,
    });

    dialog.beforeClosed().subscribe((res) => {
      if (res) {
        const newData: Course = {
          ...res,
          id: id,
        };
        this.storeCursos.dispatch(editarCurso({ curso: newData }));
      }
    });
  }
  verDetalle(id: number) {
    {
      let position = this.dataSource.data.findIndex((curso) => curso.id == id);
      let cursoData = this.dataSource.data[position];

      let dialog = this.dialog.open(DataCourseDialogComponent, {
        width: '80%',
        height: '80%',
        data: cursoData,
      });
    }
  }

  borrar(id: number) {
    this.storeCursos.dispatch(eliminarCurso({ id: id }));
    this.storeInscripciones.dispatch(borrarInscripcionPorCurso({ id: id }));
  }

  openDialog() {
    let dialog = this.dialog.open(DataCourseDialogComponent, {
      width: '50%',
      height: '80%',
    });

    dialog.beforeClosed().subscribe((res) => {
      if (res) {
        let newId: number = this.obtenerProximoId();
        let newData: Course = {
          ...res,
          id: newId,
        };
        this.storeCursos.dispatch(agregarCurso({ curso: newData }));
      }
    });
  }

  filtrar(event: Event) {
    const valorFiltro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorFiltro.trim().toLowerCase();
  }

  obtenerProximoId() {
    let maxId: number = 0;
    this.dataSource.data.forEach((curso) => {
      if (curso.id > maxId) {
        maxId = curso.id;
      }
    });
    return maxId + 1;
  }
}

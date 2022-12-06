import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CourseState } from 'src/app/courses/models/course.state';
import { CourseInscription } from 'src/app/courses/models/courseinscription';
import { cargarCursos } from 'src/app/courses/state/courses.actions';
import { selectCourses } from 'src/app/courses/state/courses.selectors';
import { Inscription } from 'src/app/inscriptions/models/inscription';
import { InscriptionState } from 'src/app/inscriptions/models/inscription.state';
import {  cargarInscripciones,  eliminarInscripcion,} from 'src/app/inscriptions/state/inscriptions.actions';
import { selectInscriptions } from 'src/app/inscriptions/state/inscriptions.selectors';
import { Student } from '../../models/student';

@Component({
  selector: 'app-view-student-dialog',
  templateUrl: './view-student-dialog.component.html',
  styleUrls: ['./view-student-dialog.component.css'],
})
export class ViewStudentDialogComponent implements OnInit, OnDestroy {
  subscripcion!: Subscription;
  alumno!: Student;
  columnas: string[] = [    'nombre',    'comision',    'profesor',    'fechaInicio',    'fechaFin',    'inscripcionAbierta',    'acciones',  ];
  dataSource: MatTableDataSource<CourseInscription> =
    new MatTableDataSource<CourseInscription>();
  constructor(
    private storeInscripciones: Store<InscriptionState>,
    private storeCursos: Store<CourseState>,
    public dialogRef: MatDialogRef<ViewStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student
  ) {
    this.alumno = data;
    this.storeCursos.dispatch(cargarCursos());
    this.storeInscripciones.dispatch(cargarInscripciones());
  }

  ngOnDestroy(): void {
    if (this.subscripcion) {
      this.subscripcion.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.actualizarLista();
  }
  actualizarLista() {
    this.subscripcion = this.storeInscripciones
      .select(selectInscriptions)
      .subscribe({
        next: (inscripciones: Inscription[]) => {
          let inscripcionesDelAlumno = inscripciones.filter(
            (inscripcion) => inscripcion.alumnoId == this.alumno.id
          );
          let data: CourseInscription[] = [];
          if (inscripcionesDelAlumno.length > 0) {
            this.storeCursos.select(selectCourses).subscribe({
              next: (cursos) => {
                data = [];
                inscripcionesDelAlumno.forEach((inscripcion) => {
                  let cursoIx = cursos.findIndex(
                    (curso) => curso.id == inscripcion.cursoId
                  );
                  let curso = cursos[cursoIx];
                  if (curso) {
                    data.push({ ...curso, inscripcionId: inscripcion.id });
                  }
                });
                this.dataSource.data = data;
              },
            });
          } else {
            this.dataSource.data = data;
          }
        },
      });
  }

  borrar(inscripcionId: number) {
    this.storeInscripciones.dispatch(
      eliminarInscripcion({ id: inscripcionId })
    );
  }

  filtrar(event: Event) {
    const valorFiltro = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = function (
      curso: CourseInscription,
      filtro: string
    ) {
      return curso.nombre
        .toLocaleLowerCase()
        .includes(filtro.toLocaleLowerCase());
    };
    this.dataSource.filter = valorFiltro.trim().toLowerCase();
  }
}

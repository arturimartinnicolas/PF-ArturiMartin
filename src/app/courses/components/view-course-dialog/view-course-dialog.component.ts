import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Student } from 'src/app/students/models/student';
import { StudentState } from 'src/app/students/models/studentstate';
import { StudentInscription } from 'src/app/students/models/studentinscription';
import { cargarAlumnos } from 'src/app/students/state/students.actions';
import { selectAlumnos } from 'src/app/students/state/students.selectors';
import { InscriptionState } from 'src/app/inscriptions/models/inscription.state';
import {  cargarInscripciones,  eliminarInscripcion,} from 'src/app/inscriptions/state/inscriptions.actions';
import { selectInscriptions } from 'src/app/inscriptions/state/inscriptions.selectors';
import { Course } from '../../models/course';

@Component({
  selector: 'app-view-course-dialog',
  templateUrl: './view-course-dialog.component.html',
  styleUrls: ['./view-course-dialog.component.css'],
})
export class ViewCourseDialogComponent implements OnInit, OnDestroy {
  subscripcion!: Subscription;
  curso!: Course;
  columnas: string[] = [
    'nombre',
    'edad',
    'genero',
    'fechaDeIngreso',
    'acciones',
  ];
  dataSource: MatTableDataSource<StudentInscription> =
    new MatTableDataSource<StudentInscription>();

  constructor(
    private storeInscripciones: Store<InscriptionState>,
    private storeAlumnos: Store<StudentState>,
    public dialogRef: MatDialogRef<ViewCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Course
  ) {
    this.curso = data;
    this.storeInscripciones.dispatch(cargarInscripciones());
    this.storeAlumnos.dispatch(cargarAlumnos());
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
        next: (inscripciones) => {
          let inscripcionesDelCurso = inscripciones.filter(
            (inscripcion) => inscripcion.cursoId == this.curso.id
          );
          let data: StudentInscription[] = [];
          if (inscripcionesDelCurso.length > 0) {
            this.storeAlumnos.select(selectAlumnos).subscribe({
              next: (alumnos) => {
                data = [];
                inscripcionesDelCurso.forEach((inscripcion) => {
                  let ixAlum = alumnos.findIndex(
                    (alum) => alum.id == inscripcion.alumnoId
                  );
                  let alumno: Student = alumnos[ixAlum];
                  if (alumno) {
                    data.push({ ...alumno, inscripcionId: inscripcion.id });
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
      alumno: StudentInscription,
      filtro: string
    ) {
      return (
        alumno.nombre
          .toLocaleLowerCase()
          .includes(filtro.toLocaleLowerCase()) ||
        alumno.apellido.toLocaleLowerCase().includes(filtro.toLocaleLowerCase())
      );
    };
    this.dataSource.filter = valorFiltro.trim().toLowerCase();
  }
}

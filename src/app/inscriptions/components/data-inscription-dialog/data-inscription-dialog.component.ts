import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Student } from 'src/app/students/models/student';
import { StudentState } from 'src/app/students/models/studentstate';
import { selectAlumnos } from 'src/app/students/state/students.selectors';
import { Course } from 'src/app/courses/models/course';
import { CourseState } from 'src/app/courses/models/course.state';
import { selectCourses } from 'src/app/courses/state/courses.selectors';
import { Inscription } from '../../models/inscription';
import { InscriptionWName} from '../../models/InscriptionWName';

@Component({
  selector: 'app-data-inscription-dialog',
  templateUrl: './data-inscription-dialog.component.html',
  styleUrls: ['./data-inscription-dialog.component.css'],
})
export class DataInscriptionDialogComponent implements OnInit {
  formulario!: FormGroup;
  alumnosInsc!: Student[];
  cursosInsc!: Course[];
  cursosSubscription: Subscription;
  alumnosSubscription: Subscription;
  constructor(
    private storeCursos: Store<CourseState>,
    private storeAlumnos: Store<StudentState>,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DataInscriptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InscriptionWName
  ) {
    this.cursosSubscription = this.storeCursos
      .select(selectCourses)
      .subscribe(
        (cursos: Course[]) =>
          (this.cursosInsc = cursos.filter(
            (curso) => curso.inscripcionAbierta == true
          ))
      );

    this.alumnosSubscription = this.storeAlumnos
      .select(selectAlumnos)
      .subscribe((alumnos: Student[]) => (this.alumnosInsc = alumnos));
  }

  ngOnInit(): void {
    if (this.data) {
      this.formulario = this.formBuilder.group({
        cursoId: [this.data.cursoId, [Validators.required]],
        alumnoId: [this.data.alumnoId, [Validators.required]],
      });
    } else {
      this.formulario = this.formBuilder.group({
        cursoId: ['', [Validators.required]],
        alumnoId: ['', [Validators.required]],
      });
    }
  }

  guardar() {
    this.dialogRef.close(this.formulario.value as Inscription);
  }
}

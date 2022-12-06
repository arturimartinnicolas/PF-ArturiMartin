import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from '../../models/course';

@Component({
  selector: 'app-data-course-dialog',
  templateUrl: './data-course-dialog.component.html',
  styleUrls: ['./data-course-dialog.component.css'],
})
export class DataCourseDialogComponent implements OnInit {
  formulario!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DataCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Course
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.formulario = this.formBuilder.group({
        nombre: [this.data.nombre, [Validators.required]],
        comision: [this.data.comision, [Validators.required]],
        profesor: [this.data.profesor, [Validators.required]],
        fechaInicio: [this.data.fechaInicio, [Validators.required]],
        fechaFin: [this.data.fechaFin, [Validators.required]],
        inscripcionAbierta: [this.data.inscripcionAbierta, []],
      });
    } else {
      this.formulario = this.formBuilder.group({
        nombre: ['', [Validators.required]],
        comision: ['', [Validators.required]],
        profesor: ['', [Validators.required]],
        fechaInicio: ['', [Validators.required]],
        fechaFin: ['', [Validators.required]],
        inscripcionAbierta: [true, []],
      });
    }
  }

  guardar() {
    this.dialogRef.close(this.formulario.value as Course);
  }
}

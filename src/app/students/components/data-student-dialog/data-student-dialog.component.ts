import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from '../../models/student';

@Component({
  selector: 'app-data-student-dialog',
  templateUrl: './data-student-dialog.component.html',
  styleUrls: ['./data-student-dialog.component.css'],
})
export class DataStudentDialogComponent implements OnInit {
  formulario!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DataStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.formulario = this.formBuilder.group({
        nombre: [this.data.nombre, [Validators.required]],
        apellido: [this.data.apellido, [Validators.required]],
        edad: [
          this.data.edad,
          [Validators.required, Validators.pattern('^[0-9]*$')],
        ],
        genero: [this.data.genero, [Validators.required]],
        fechaDeIngreso: [this.data.fechaDeIngreso, []],
      });
    } else {
      this.formulario = this.formBuilder.group({
        nombre: ['', [Validators.required]],
        apellido: ['', [Validators.required]],
        edad: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        genero: ['', [Validators.required]],
      });
    }
  }

  guardar() {
    if (this.dialogRef) {
      this.dialogRef.close(this.formulario.value as Student);
    }
  }
}

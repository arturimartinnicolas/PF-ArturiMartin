import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../models/user';

@Component({
  selector: 'app-data-user-dialog',
  templateUrl: './data-user-dialog.component.html',
  styleUrls: ['./data-user-dialog.component.css'],
})
export class DataUserDialogComponent implements OnInit {
  formulario!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DataUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.formulario = this.formBuilder.group({
        usuario: [this.data.usuario, [Validators.required]],
        clave: [this.data.clave, [Validators.required]],
        esAdmin: [this.data.esAdmin, [Validators.required]],
      });
    } else {
      this.formulario = this.formBuilder.group({
        usuario: ['', [Validators.required]],
        clave: ['', [Validators.required]],
        esAdmin: [false, [Validators.required]],
      });
    }
  }

  guardar() {
    if (this.dialogRef) {
      this.dialogRef.close(this.formulario.value as User);
    }
  }
}

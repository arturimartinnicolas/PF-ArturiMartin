import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentsListComponent } from './students-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material/material.module';
import { StudentsService } from '../../services/students.service';
import { Student } from '../../models/student';
import { Observable, of, throwError } from 'rxjs';
import { InscriptionsService } from 'src/app/inscriptions/services/inscriptions.service';
import { Injectable } from '@angular/core';
import { Inscription } from 'src/app/inscriptions/models/inscription';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';
import { inscriptionsReducer } from 'src/app/inscriptions/state/inscriptions.reducer';
import { studentsReducer } from '../../state/students.reducer';
import { reducer } from 'src/app/core/state/session.reducer';
import { StudentState } from '../../models/studentstate';

const alumnosEstadoInicial: StudentState = {
  cargando: false,
  alumnos: [],
};
class DatosAlumnosDialogMock {
  result!: Student;

  setResult(val: Student) {
    this.result = val;
  }
  open() {
    return {
      beforeClosed: () =>
        of({
          nombre: 'Willy Jean',
          apellido: 'Botsford',
          edad: 52,
          genero: 'M',
          fechaDeIngreso: new Date('2022-10-30T22:46:07.783Z'),
          id: 1,
        }),
    };
  }
  // open() {}
  close() {
    return of(this.result);
  }
  afterClosed() {
    return of(this.result);
  }
}
describe('StudentsListComponent', () => {
  let component: StudentsListComponent;
  let fixture: ComponentFixture<StudentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        SharedModule,
        StoreModule.forRoot({
          inscripciones: inscriptionsReducer,
          alumnos: studentsReducer,
          sesion: reducer,
        }),
      ],
      declarations: [StudentsListComponent],
      providers: [
        { provide: MatDialog, useClass: DatosAlumnosDialogMock },
        provideMockStore({
          initialState: alumnosEstadoInicial,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Filtrar por un alumno', (done: DoneFn) => {
    let filtro = fixture.debugElement.query(By.css('#filtroAlumno'));
    filtro.triggerEventHandler('keyup', { target: { value: 'Willy' } });
    expect(component.dataSource.filteredData.length).toBe(0);
    done();
  });
});

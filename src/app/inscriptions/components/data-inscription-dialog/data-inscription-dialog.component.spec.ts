import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataInscriptionDialogComponent } from './data-inscription-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { studentsReducer } from 'src/app/students/state/students.reducer';
import { StoreModule } from '@ngrx/store';
import { coursesReducer } from 'src/app/courses/state/courses.reducer';

describe('DataInscriptionDialogComponent', () => {
  let component: DataInscriptionDialogComponent;
  let fixture: ComponentFixture<DataInscriptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({
          cursos: coursesReducer,
          alumnos: studentsReducer,
        }),
      ],
      declarations: [DataInscriptionDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: DataInscriptionDialogComponent },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            cursoId: '2',
            alumnoId: '2',
            id: '1',
            cursoNombre: 'CSS',
            alumnoNombre: 'Josefilo',
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DataInscriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

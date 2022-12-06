import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewCourseDialogComponent } from './view-course-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { studentsReducer } from 'src/app/students/state/students.reducer';
import { inscriptionsReducer } from 'src/app/inscriptions/state/inscriptions.reducer';
describe('ViewCourseDialogComponent', () => {
  let component: ViewCourseDialogComponent;
  let fixture: ComponentFixture<ViewCourseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,

        StoreModule.forRoot({
          inscripciones: inscriptionsReducer,
          alumnos: studentsReducer,
        }),
      ],
      declarations: [ViewCourseDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: ViewCourseDialogComponent },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            nombre: 'CSS',
            comision: '89987-4498',
            profesor: 'Justina',
            fechaInicio: '2022-10-04T21:10:18.498Z',
            fechaFin: '2023-09-11T22:47:45.953Z',
            inscripcionAbierta: true,
            id: '2',
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewCourseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

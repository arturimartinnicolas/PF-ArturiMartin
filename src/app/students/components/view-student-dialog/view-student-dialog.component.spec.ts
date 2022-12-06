import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ViewStudentDialogComponent } from './view-student-dialog.component';
import { ApellidoNombrePipe } from 'src/app/shared/pipes/apellido-nombre.pipe';
import { FemeninoMasculinoPipe } from 'src/app/shared/pipes/femenino-masculino.pipe';
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Inscription } from 'src/app/inscriptions/models/inscription';
import { Course } from 'src/app/courses/models/course';
import { InscriptionsModule } from 'src/app/inscriptions/Inscriptions.module';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';
import { InscriptionState } from 'src/app/inscriptions/models/inscription.state';
import { CourseState} from 'src/app/courses/models/course.state';
import { coursesReducer } from 'src/app/courses/state/courses.reducer';
import { inscriptionsReducer } from 'src/app/inscriptions/state/inscriptions.reducer';
import { EffectsModule } from '@ngrx/effects';
import { selectInscriptions } from 'src/app/inscriptions/state/inscriptions.selectors';
import { selectCourses } from 'src/app/courses/state/courses.selectors';

const inscripcionesEstadoInicial: InscriptionState = {
  cargando: false,
  inscripciones: [],
};
const inscripcionesEstado2: Inscription[] = [
  {
    cursoId: 1,
    alumnoId: 1,
    id: 1,
  },
  {
    cursoId: 2,
    alumnoId: 8,
    id: 2,
  },
];

const cursosEstadoInicial: CourseState = {
  cargando: false,
  cursos: [],
};
const cursosEstado2: Course[] = [
  {
    nombre: 'SMS',
    comision: '47990-9591',
    profesor: 'Waylon',
    fechaInicio: new Date('2022-01-02T03:26:22.260Z'),
    fechaFin: new Date('2023-04-19T03:04:28.243Z'),
    inscripcionAbierta: false,
    id: 1,
  },
  {
    nombre: 'SQL',
    comision: '44813-6260',
    profesor: 'Keshaun',
    fechaInicio: new Date('2022-06-21T03:42:11.092Z'),
    fechaFin: new Date('2022-11-01T14:11:13.848Z'),
    inscripcionAbierta: true,
    id: 2,
  },
];

describe('ViewStudentDialogComponent', () => {
  let component: ViewStudentDialogComponent;
  let fixture: ComponentFixture<ViewStudentDialogComponent>;

  let storeInscripciones: MockStore<InscriptionState>;
  let storeCursos: MockStore<CourseState>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MaterialModule,
        InscriptionsModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({
          inscripciones: inscriptionsReducer,
          cursos: coursesReducer,
        }),
        EffectsModule.forRoot(),
      ],
      declarations: [
        ViewStudentDialogComponent,
        ApellidoNombrePipe,
        FemeninoMasculinoPipe,
      ],
      providers: [
        provideMockStore({
          initialState: inscripcionesEstadoInicial,
        }),
        provideMockStore({ initialState: cursosEstadoInicial }),
        { provide: MatDialogRef, useValue: ViewStudentDialogComponent },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            nombre: 'Willy',
            apellido: 'Botsford',
            edad: 52,
            genero: 'M',
            fechaDeIngreso: new Date('2022-10-30T22:46:07.783Z'),
            id: 8,
          },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ViewStudentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    storeInscripciones = TestBed.inject(MockStore<InscriptionState>);
    storeCursos = TestBed.inject(MockStore<CourseState>);
    storeInscripciones.overrideSelector(
      selectInscriptions,
      inscripcionesEstado2 as Inscription[]
    );
    storeCursos.overrideSelector(selectCourses, cursosEstado2 as Course[]);

    storeCursos.refreshState();
    storeInscripciones.refreshState();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

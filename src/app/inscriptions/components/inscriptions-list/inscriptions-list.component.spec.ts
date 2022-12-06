import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InscriptionsListComponent } from './inscriptions-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material/material.module';
import { provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';
import { studentsReducer } from 'src/app/students/state/students.reducer';
import { reducer } from 'src/app/core/state/session.reducer';
import { inscriptionsReducer } from '../../state/inscriptions.reducer';
import { coursesReducer } from 'src/app/courses/state/courses.reducer';

describe('InscriptionsListComponent', () => {
  let component: InscriptionsListComponent;
  let fixture: ComponentFixture<InscriptionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,

        StoreModule.forRoot({
          inscripciones: inscriptionsReducer,
          alumnos: studentsReducer,
          cursos: coursesReducer,
          sesion: reducer,
        }),
      ],
      declarations: [InscriptionsListComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(InscriptionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

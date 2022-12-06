import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { Course } from '../models/course';
import { CoursesService } from '../services/courses.service';

import { CoursesEffects } from './courses.effects';

@Injectable({
  providedIn: 'root',
})
class CursosServiceMock extends CoursesService {
  data: Course[] = [
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
  override obtenerCurso(id: number): Observable<Course> {
    let ix = this.data.findIndex((curso) => curso.id == id);
    return of(this.data[ix]);
  }
}
describe('CoursesEffects', () => {
  let actions$: Observable<any>;
  let effects: CoursesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CoursesEffects,
        provideMockActions(() => actions$),

        { provide: CoursesService, useClass: CursosServiceMock },
      ],
    });

    effects = TestBed.inject(CoursesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { StudentsService } from './students.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Student} from '../models/student';
import { HttpErrorResponse } from '@angular/common/http';

describe('StudentsService', () => {
  let service: StudentsService;
  let httpClientSpy: {
    get: jasmine.Spy;
    post: jasmine.Spy;
    put: jasmine.Spy;
    delete: jasmine.Spy;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'put',
      'delete',
    ]);
    service = new StudentsService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('El metodo agregarAlumno agrega un alumno', (done: DoneFn) => {
    const nuevoAlumno: Student = {
      nombre: 'Carlos',
      apellido: 'Rodriguez',
      edad: 54,
      genero: 'M',
      fechaDeIngreso: new Date('2022-11-22T03:44:31.032Z'),
      id: 5,
    };
    httpClientSpy.post.and.returnValue(of(nuevoAlumno));

    service.agregarAlumno(nuevoAlumno).subscribe((alumno) => {
      expect(alumno).toEqual(nuevoAlumno);
      done();
    });
  });

  it('El metodo agregarAlumno agrega un alumno', (done: DoneFn) => {
    const nuevoAlumno: Student = {
      nombre: 'Carlos',
      apellido: 'Rodriguez',
      edad: 54,
      genero: 'M',
      fechaDeIngreso: new Date('2022-11-22T03:44:31.032Z'),
      id: 5,
    };
    httpClientSpy.post.and.returnValue(of(nuevoAlumno));

    service.agregarAlumno(nuevoAlumno).subscribe((alumno) => {
      expect(alumno).toEqual(nuevoAlumno);
      done();
    });
  });

  it('El metodo obtenerAlumnos retorna un arreglo de alumnos', (done: DoneFn) => {
    const alumnosMock: Student[] = [
      {
        nombre: 'Willy',
        apellido: 'Botsford',
        edad: 52,
        genero: 'M',
        fechaDeIngreso: new Date('2022-10-30T22:46:07.783Z'),
        id: 1,
      },
      {
        nombre: 'Marlin',
        apellido: 'Hoppe',
        edad: 32,
        genero: 'M',
        fechaDeIngreso: new Date('2022-10-30T09:23:02.626Z'),
        id: 2,
      },
      {
        nombre: 'Berenice',
        apellido: 'Hermiston',
        edad: 37,
        genero: 'F',
        fechaDeIngreso: new Date('2022-10-30T04:16:51.374Z'),
        id: 3,
      },
      {
        nombre: 'Abby',
        apellido: 'Champlin',
        edad: 54,
        genero: 'F',
        fechaDeIngreso: new Date('2022-10-30T03:44:31.032Z'),
        id: 4,
      },
    ];

    httpClientSpy.get.and.returnValue(of(alumnosMock));

    service.obtenerAlumnos().subscribe((alumnos) => {
      expect(alumnos).toEqual(alumnosMock);
      done();
    });
  });

  it('El metodo borrarAlumno borra un alumno', (done: DoneFn) => {
    const idAlumnoABorrar: number = 5;

    const alumnoABorrar: Student = {
      nombre: 'Carlos',
      apellido: 'Rodriguez',
      edad: 54,
      genero: 'M',
      fechaDeIngreso: new Date('2022-11-22T03:44:31.032Z'),
      id: 5,
    };
    httpClientSpy.delete.and.returnValue(of(alumnoABorrar));

    service.borrarAlumno(idAlumnoABorrar).subscribe((alumno) => {
      expect(alumno).toEqual(alumnoABorrar);
      done();
    });
  });

  it('El metodo modificarAlumno modifica un alumno', (done: DoneFn) => {
    const idAlumnoAModificar: number = 5;
    const alumnoAModificar: Student = {
      nombre: 'Carlos',
      apellido: 'Rodriguez',
      edad: 54,
      genero: 'M',
      fechaDeIngreso: new Date('2022-11-22T03:44:31.032Z'),
      id: 5,
    };
    httpClientSpy.put.and.returnValue(of(alumnoAModificar));

    service
      .modificarAlumno(idAlumnoAModificar, alumnoAModificar)
      .subscribe((alumno) => {
        expect(alumno).toEqual(alumnoAModificar);
        done();
      });
  });

  it('El metodo obtenerAlumno obtiene un alumno', (done: DoneFn) => {
    const idAlumnoAObtener: number = 5;
    const alumnoAObtener: Student = {
      nombre: 'Carlos',
      apellido: 'Rodriguez',
      edad: 54,
      genero: 'M',
      fechaDeIngreso: new Date('2022-11-22T03:44:31.032Z'),
      id: 5,
    };
    httpClientSpy.get.and.returnValue(of(alumnoAObtener));

    service.obtenerAlumno(idAlumnoAObtener).subscribe((alumno) => {
      expect(alumno).toEqual(alumnoAObtener);
      done();
    });
  });

  it('El metodo manejarError lanza un error del servidor', (done: DoneFn) => {
    const err: HttpErrorResponse = new HttpErrorResponse({
      error: { message: 'El test lanza este error' },
    });
    (service as any).manejarError(err).subscribe({
      next(sinError: any) {
        expect(false).toEqual(true);
        done();
      },
      error(objError: any) {
        expect(objError).toMatch('Error en la comunicacion HTTP');
        done();
      },
    });
  });

  it('El metodo manejarError lanza un error del cliente', (done: DoneFn) => {
    const evError: ErrorEvent = new ErrorEvent('Cliente desconectado');
    const err: HttpErrorResponse = new HttpErrorResponse({
      error: evError,
    });
    (service as any).manejarError(err).subscribe({
      next(sinError: any) {
        expect(false).toEqual(true);
        done();
      },
      error(objError: any) {
        expect(objError).toMatch('Error en la comunicacion HTTP');
        done();
      },
    });
  });
});

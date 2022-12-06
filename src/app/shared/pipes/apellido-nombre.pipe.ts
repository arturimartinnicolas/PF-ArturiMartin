import { Pipe, PipeTransform } from '@angular/core';
import { Student } from 'src/app/students/models/student';

@Pipe({
  name: 'apellidoNombre',
})
export class ApellidoNombrePipe implements PipeTransform {
  transform(value: Student, ...args: number[]): string {
    if (args[0] == 0) {
      return value.nombre + ' ' + value.apellido;
    }
    return value.apellido + ', ' + value.nombre;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanATexto',
})
export class BooleanATextoPipe implements PipeTransform {
  transform(value: boolean): string {
    if (value) {
      return 'Si';
    }
    return 'No';
  }
}

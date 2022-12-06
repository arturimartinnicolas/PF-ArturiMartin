import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'femeninoMasculino',
})
export class FemeninoMasculinoPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    if (value == 'M') {
      return 'Masculino';
    } else {
      return 'Femenino';
    }
  }
}

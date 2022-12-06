import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header20Directive } from './directives/header20.directive';
import { FemeninoMasculinoPipe } from './pipes/femenino-masculino.pipe';
import { ApellidoNombrePipe } from './pipes/apellido-nombre.pipe';
import { HttpClientModule } from '@angular/common/http';
import { BooleanATextoPipe } from './pipes/boolean-atexto.pipe';

@NgModule({
  declarations: [
    Header20Directive,
    FemeninoMasculinoPipe,
    ApellidoNombrePipe,
    BooleanATextoPipe,
  ],
  imports: [CommonModule, HttpClientModule],
  exports: [
    Header20Directive,
    FemeninoMasculinoPipe,
    ApellidoNombrePipe,
    HttpClientModule,
    BooleanATextoPipe,
  ],
})
export class SharedModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionsListComponent } from './components/inscriptions-list/inscriptions-list.component';
import { DataInscriptionDialogComponent } from './components/data-inscription-dialog/data-inscription-dialog.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { InscriptionsRoutingModule } from './Inscriptions-routing.module';
import { StudentsService } from '../students/services/students.service';
import { InscriptionsService } from './services/inscriptions.service';
import { EffectsModule } from '@ngrx/effects';
import { InscriptionsEffects } from './state/inscriptions.effects';
import {  inscriptionsFeatureKey,  inscriptionsReducer} from './state/inscriptions.reducer';
import { StoreModule } from '@ngrx/store';
import {  coursesFeatureKey,  coursesReducer} from '../courses/state/courses.reducer';
import { CoursesEffects } from '../courses/state/courses.effects';
import { CoursesService } from '../courses/services/courses.service';
import {  studentsFeatureKey,  studentsReducer} from '../students/state/students.reducer';
import { StudentsEffects } from '../students/state/students.effects';

@NgModule({
  declarations: [InscriptionsListComponent, DataInscriptionDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    InscriptionsRoutingModule,
    StoreModule.forFeature(inscriptionsFeatureKey, inscriptionsReducer),
    StoreModule.forFeature(coursesFeatureKey, coursesReducer),
    EffectsModule.forFeature([InscriptionsEffects]),
    EffectsModule.forFeature([CoursesEffects]),
    StoreModule.forFeature(studentsFeatureKey, studentsReducer),
    EffectsModule.forFeature([StudentsEffects]),
  ],
  exports: [],
  providers: [StudentsService, InscriptionsService, CoursesService],
})
export class InscriptionsModule {}

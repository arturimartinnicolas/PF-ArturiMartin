import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { DataStudentDialogComponent } from './components/data-student-dialog/data-student-dialog.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewStudentDialogComponent } from './components/view-student-dialog/view-student-dialog.component';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsService } from './services/students.service';
import { InscriptionsService } from '../inscriptions/services/inscriptions.service';
import { CoursesService } from '../courses/services/courses.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StudentsEffects } from './state/students.effects';
import { studentsFeatureKey, studentsReducer } from './state/students.reducer';
import { CoursesEffects } from '../courses/state/courses.effects';
import {  coursesFeatureKey,  coursesReducer,} from '../courses/state/courses.reducer';
import { InscriptionsEffects } from '../inscriptions/state/inscriptions.effects';
import {  inscriptionsFeatureKey,  inscriptionsReducer,} from '../inscriptions/state/inscriptions.reducer';

@NgModule({
  declarations: [
    StudentsListComponent,
    DataStudentDialogComponent,
    ViewStudentDialogComponent,
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forFeature(studentsFeatureKey, studentsReducer),
    EffectsModule.forFeature([StudentsEffects]),
    StoreModule.forFeature(coursesFeatureKey, coursesReducer),
    EffectsModule.forFeature([CoursesEffects]),
    StoreModule.forFeature(inscriptionsFeatureKey, inscriptionsReducer),
    EffectsModule.forFeature([InscriptionsEffects]),
  ],
  providers: [StudentsService, InscriptionsService, CoursesService],
  exports: [],
})
export class AlumnosModule {}

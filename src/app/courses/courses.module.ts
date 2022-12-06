import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { MaterialModule } from '../material/material.module';
import { DataCourseDialogComponent } from './components/data-course-dialog/data-course-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ViewCourseDialogComponent } from './components/view-course-dialog/view-course-dialog.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { StudentsService } from '../students/services/students.service';
import { CoursesService } from './services/courses.service';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffects } from './state/courses.effects';
import { StoreModule } from '@ngrx/store';
import { coursesFeatureKey, coursesReducer } from './state/courses.reducer';
import {  inscriptionsFeatureKey,  inscriptionsReducer} from '../inscriptions/state/inscriptions.reducer';
import { InscriptionsEffects } from '../inscriptions/state/inscriptions.effects';
import { InscriptionsService } from '../inscriptions/services/inscriptions.service';
import { StudentsEffects } from '../students/state/students.effects';
import {  studentsFeatureKey,  studentsReducer,} from '../students/state/students.reducer';

@NgModule({
  declarations: [
    CoursesListComponent,
    DataCourseDialogComponent,
    ViewCourseDialogComponent,
  ],
  imports: [
    CoursesRoutingModule,
    CommonModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forFeature(coursesFeatureKey, coursesReducer),
    EffectsModule.forFeature([CoursesEffects]),
    StoreModule.forFeature(inscriptionsFeatureKey, inscriptionsReducer),
    EffectsModule.forFeature([InscriptionsEffects]),
    StoreModule.forFeature(studentsFeatureKey, studentsReducer),
    EffectsModule.forFeature([StudentsEffects]),
  ],
  exports: [],
  providers: [StudentsService, CoursesService, InscriptionsService],
})
export class CoursesModule {}

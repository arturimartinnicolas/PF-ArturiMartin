import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from '../material/material.module';
import { reducer, sessionFeatureKey } from './state/session.reducer';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [PageNotFoundComponent, HomeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    StoreModule.forFeature(sessionFeatureKey, reducer),
  ],
  providers: [],
  exports: [],
})
export class CoreModule {}

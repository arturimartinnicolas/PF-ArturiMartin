import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { UsersListComponent } from './components/users-list/users-list.component';
import { DataUserDialogComponent } from './components/data-user-dialog/data-user-dialog.component';
import { UsersService } from './service/users.service';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './state/users.effects';
import { StoreModule } from '@ngrx/store';
import { usersFeatureKey, usersReducer } from './state/users.reducer';

@NgModule({
  declarations: [UsersListComponent, DataUserDialogComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forFeature(usersFeatureKey, usersReducer),
    EffectsModule.forFeature([UsersEffects]),
  ],
  providers: [UsersService],
})
export class UsersModule {}

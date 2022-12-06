import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutenticathionRoutingModule } from './autenticathion-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../users/service/users.service';
import { StoreModule } from '@ngrx/store';
import {  usersFeatureKey,  usersReducer,} from '../users/state/users.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from '../users/state/users.effects';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AutenticathionRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forFeature(usersFeatureKey, usersReducer),
    EffectsModule.forFeature([UsersEffects]),
  ],
  providers: [UsersService],
})
export class AutenticathionModule {}

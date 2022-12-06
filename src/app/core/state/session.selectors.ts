import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Session } from '../models/session';
import * as fromSesion from './session.reducer';

export const selectSessionState = createFeatureSelector<Session>(
  fromSesion.sessionFeatureKey
);

export const selectSession = createSelector(selectSessionState, (state) => state);

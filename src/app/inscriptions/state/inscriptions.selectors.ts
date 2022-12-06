import { createFeatureSelector, createSelector } from '@ngrx/store';
import { tap } from 'rxjs';
import { InscriptionState } from '../models/inscription.state';
import * as fromInscripciones from './inscriptions.reducer';

export const selectInscriptionsState =
  createFeatureSelector<InscriptionState>(
    fromInscripciones.inscriptionsFeatureKey
  );
export const selectInscripcionesCargando = createSelector(
  selectInscriptionsState,
  (state) => state.cargando
);

export const selectInscriptions = createSelector(
  selectInscriptionsState,
  (state) => state.inscripciones
);

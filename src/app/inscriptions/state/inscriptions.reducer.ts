import { Action, createReducer, on } from '@ngrx/store';
import { InscriptionState } from '../models/inscription.state';
import * as InscriptionsActions from './inscriptions.actions';

export const inscriptionsFeatureKey = 'inscripciones';

export const estadoInicial: InscriptionState = {
  cargando: false,
  inscripciones: [],
};

export const inscriptionsReducer = createReducer(
  estadoInicial,

  on(InscriptionsActions.cargarInscripciones, (state) => {
    return { ...state, cargando: true };
  }),

  on(InscriptionsActions.inscripcionesCargadas, (state, { inscripciones }) => {
    return { ...state, cargando: false, inscripciones: inscripciones };
  }),
  on(InscriptionsActions.agregarInscripcion, (state, { inscripcion }) => {
    return state;
  }),
  on(InscriptionsActions.editarInscripcion, (state, { inscripcion }) => {
    return state;
  }),
  on(InscriptionsActions.eliminarInscripcion, (state, { id }) => {
    return state;
  }),
  on(InscriptionsActions.borrarInscripcionPorCurso, (state, { id }) => {
    return state;
  }),
  on(InscriptionsActions.borrarInscripcionPorAlumno, (state, { id }) => {
    return state;
  })
);

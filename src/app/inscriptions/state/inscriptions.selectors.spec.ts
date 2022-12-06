import * as fromInscripciones from './inscriptions.reducer';
import { selectInscriptionsState } from './inscriptions.selectors';

describe('Inscriptions Selectors', () => {
  it('should select the feature state', () => {
    const result = selectInscriptionsState({
      [fromInscripciones.inscriptionsFeatureKey]: {},
    });

    expect(result).toEqual(result);
  });
});

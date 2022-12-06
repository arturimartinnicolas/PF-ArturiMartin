import { Session } from '../models/session';
import * as fromSesion from './session.reducer';
import { selectSessionState } from './session.selectors';

describe('Session Selectors', () => {
  it('should select the feature state', () => {
    const result = selectSessionState({
      [fromSesion.sessionFeatureKey]: {},
    });
    expect(result).toEqual({} as Session);
  });
});

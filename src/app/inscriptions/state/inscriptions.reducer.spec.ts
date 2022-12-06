import { inscriptionsReducer, estadoInicial } from './inscriptions.reducer';

describe('Inscriptions Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = inscriptionsReducer(estadoInicial, action);

      expect(result).toBe(estadoInicial);
    });
  });
});

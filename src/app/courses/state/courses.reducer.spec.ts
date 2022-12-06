import { coursesReducer, estadoInicial } from './courses.reducer';

describe('Courses Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = coursesReducer(estadoInicial, action);

      expect(result).toBe(estadoInicial);
    });
  });
});

import { studentsReducer, estadoInicial } from './students.reducer';

describe('Students Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = studentsReducer(estadoInicial, action);

      expect(result).toBe(estadoInicial);
    });
  });
});

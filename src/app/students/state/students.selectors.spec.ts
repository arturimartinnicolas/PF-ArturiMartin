import * as fromAlumnos from './students.reducer';
import { selectStudentsState } from './students.selectors';

describe('Students Selectors', () => {
  it('should select the feature state', () => {
    const result = selectStudentsState({
      [fromAlumnos.studentsFeatureKey]: {},
    });

    expect(result).toEqual(result);
  });
});

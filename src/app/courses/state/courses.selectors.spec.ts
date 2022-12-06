import { Course } from '../models/course';
import { CourseState } from '../models/course.state';
import * as fromCursos from './courses.reducer';
import { selectCoursesState } from './courses.selectors';

describe('Courses Selectors', () => {
  it('should select the feature state', () => {
    const result = selectCoursesState({
      [fromCursos.coursesFeatureKey]: {},
    });
    expect(result).toEqual({} as CourseState);
  });
});

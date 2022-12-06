import * as fromUsuarios from './users.reducer';
import { selectUsersState } from './users.selectors';

describe('Users Selectors', () => {
  it('should select the feature state', () => {
    const result = selectUsersState({
      [fromUsuarios.usersFeatureKey]: {},
    });

    expect(result).toEqual(result);
  });
});

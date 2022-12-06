import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { AutenticacionGuard } from './autenticacion.guard';

describe('AutenticacionGuard', () => {
  let guard: AutenticacionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({})],
    }).compileComponents();
    guard = TestBed.inject(AutenticacionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

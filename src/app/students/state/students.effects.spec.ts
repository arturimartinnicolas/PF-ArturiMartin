import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { StudentsService } from '../services/students.service';

import { StudentsEffects } from './students.effects';

describe('StudentsEffects', () => {
  let actions$: Observable<any>;
  let effects: StudentsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        StudentsEffects,
        provideMockActions(() => actions$),
        StudentsService,
      ],
    });

    effects = TestBed.inject(StudentsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});

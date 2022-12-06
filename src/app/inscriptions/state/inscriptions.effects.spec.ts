import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { InscriptionsService } from '../services/inscriptions.service';

import { InscriptionsEffects } from './inscriptions.effects';

describe('InscriptionsEffects', () => {
  let actions$: Observable<any>;
  let effects: InscriptionsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        InscriptionsEffects,
        provideMockActions(() => actions$),
        InscriptionsService,
      ],
    });

    effects = TestBed.inject(InscriptionsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { InscriptionsService } from './inscriptions.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InscriptionsService', () => {
  let service: InscriptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(InscriptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

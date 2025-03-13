import { TestBed } from '@angular/core/testing';

import { PhaseNameService } from './phase-name.service';

describe('PhaseNameService', () => {
  let service: PhaseNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhaseNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

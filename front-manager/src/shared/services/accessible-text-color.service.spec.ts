import { TestBed } from '@angular/core/testing';

import { AccessibleTextColorService } from './accessible-text-color.service';

describe('AccessibleTextColorService', () => {
  let service: AccessibleTextColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessibleTextColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

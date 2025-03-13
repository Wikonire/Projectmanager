import { TestBed } from '@angular/core/testing';

import { PriorityColorService } from './priority-color.service';

describe('PriorityColorService', () => {
  let service: PriorityColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriorityColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { UserOverviewService } from './user-overview.service';

describe('UserOverviewService', () => {
  let service: UserOverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserOverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

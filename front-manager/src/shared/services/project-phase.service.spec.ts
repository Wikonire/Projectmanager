import { TestBed } from '@angular/core/testing';

import { ProjectPhaseService } from './project-phase.service';

describe('ProjectPhaseService', () => {
  let service: ProjectPhaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectPhaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

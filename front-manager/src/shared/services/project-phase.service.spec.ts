import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProjectPhaseService } from './project-phase.service';
import { ProjectPhase, PhaseStatus } from '../interfaces/project-phase.model';

describe('ProjectPhaseService', () => {
  let service: ProjectPhaseService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/phases';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectPhaseService],
    });
    service = TestBed.inject(ProjectPhaseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getPhaseById', () => {
    it('should fetch a single project phase by ID and transform data', () => {
      const mockPhase: ProjectPhase = {
        id: '1',
        phaseName: { id: '101', name: 'Planning' },
        progress: 50,
        plannedStartDate: new Date('2024-04-01T00:00:00.000Z'),
        plannedEndDate: new Date('2024-06-01T00:00:00.000Z'),
        actualStartDate: undefined,
        actualEndDate: undefined,
        phaseStatus: { id: '201', name: 'In Progress' },
        documents: []
      };

      service.getPhaseById('1').subscribe((phase) => {
        expect(phase.id).toBe('1');
        expect(phase.phaseName.name).toBe('Planning');
        expect(phase.progress).toBe(50);
        expect(phase.plannedStartDate).toBeInstanceOf(Date);
        expect(phase.plannedEndDate).toBeInstanceOf(Date);
        expect(phase.actualStartDate).toBeUndefined();
        expect(phase.actualEndDate).toBeUndefined();
        expect(phase.phaseStatus.name).toBe('In Progress');
        expect(phase.documents).toEqual([]);
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockPhase);
    });
  });

  describe('updatePhase', () => {
    it('should update a project phase', () => {
      const updateData: Partial<ProjectPhase> = {
        id: '1',
        phaseName: { id: '101', name: 'Updated Phase' },
        progress: 75
      };

      service.updatePhase(updateData).subscribe((phase) => {
        expect(phase.phaseName.name).toBe('Updated Phase');
        expect(phase.progress).toBe(75);
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual({ phaseName: { id: '101', name: 'Updated Phase' }, progress: 75 });
      req.flush(updateData);
    });
  });
});

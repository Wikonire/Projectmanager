import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PhaseNameService, PhaseName } from './phase-name.service';


describe('PhaseNameService', () => {
  let service: PhaseNameService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/phase-name';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PhaseNameService],
    });
    service = TestBed.inject(PhaseNameService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  })
  it('should be created', () => {
    expect(service).toBeTruthy();
  })

  describe('getAll', () => {
    it('should fetch all phases', () => {
      const mockPhases: PhaseName[] = [
        { id: '1', name: 'Phase 1' },
        { id: '2', name: 'Phase 2' },
      ];

      service.getAll().subscribe((phases) => {
        expect(phases).toEqual(mockPhases);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockPhases);
    });
  });

  describe('getById', () => {
    it('should fetch a single phase by ID', () => {
      const mockPhase: PhaseName = { id: '1', name: 'Phase 1' };

      service.getById('1').subscribe((phase) => {
        expect(phase).toEqual(mockPhase);
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockPhase);
    });
  });

  describe('create', () => {
    it('should create a new phase', () => {
      const mockPhase: PhaseName = { id: '3', name: 'New Phase' };

      service.create('New Phase').subscribe((phase) => {
        expect(phase).toEqual(mockPhase);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ name: 'New Phase' });
      req.flush(mockPhase);
    });
  });

  describe('delete', () => {
    it('should delete a phase', () => {
      service.delete('1').subscribe((response) => {
        expect(response).toBeUndefined();
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StatusNameService } from './status-name.service';
import { ProjectStatus } from '../interfaces/status.model';
import { HttpErrorResponse } from '@angular/common/http';

describe('StatusNameService', () => {
  let service: StatusNameService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/status-names';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StatusNameService],
    });
    service = TestBed.inject(StatusNameService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getAll', () => {
    it('should fetch all project statuses', () => {
      const mockStatuses: ProjectStatus[] = [
        { id: '1', name: 'Open' },
        { id: '2', name: 'In Progress' },
        { id: '3', name: 'Completed' },
      ];

      service.getAll().subscribe((statuses) => {
        expect(statuses).toEqual(mockStatuses);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockStatuses);
    });

    it('should handle a 404 error gracefully', () => {
      service.getAll().subscribe({
        next: () => fail('Expected error, but got success response'),
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(404);
          expect(error.statusText).toBe('Not Found');
        }
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });

    it('should handle a network error', () => {
      service.getAll().subscribe({
        next: () => fail('Expected network error, but got success response'),
        error: (error: HttpErrorResponse) => {
          expect(error.error.message).toBe('Network error');
        }
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.error(new ErrorEvent('Network error'));
    });
  });
});

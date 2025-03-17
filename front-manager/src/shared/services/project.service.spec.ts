import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProjectService } from './project.service';
import { Project } from '../interfaces/project.model';

describe('ProjectService', () => {
  let service: ProjectService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/projects';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectService],
    });
    service = TestBed.inject(ProjectService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getAllActive', () => {
    it('should fetch all active projects', () => {
      const mockProjects: Project[] = [
        {
          id: '1', title: 'Active Project 1',
          description: '',
          approvalSignature: '',
          progress: 0,
          plannedStartDate:  new Date(),
          plannedEndDate:  new Date(),
          createdAt: ''
        },
        {
          id: '2', title: 'Active Project 2',
          description: '',
          approvalSignature: '',
          progress: 0,
          plannedStartDate: new Date(),
          plannedEndDate: new Date(),
          createdAt:  new Date().toDateString()
        },
      ];

      service.getAllActive().subscribe((projects) => {
        expect(projects).toEqual(mockProjects);
      });

      const req = httpMock.expectOne(`${apiUrl}/active`);
      expect(req.request.method).toBe('GET');
      req.flush(mockProjects);
    });
  });

  describe('getAllArchived', () => {
    it('should fetch all archived projects', () => {
      const mockProjects: Project[] = [
        {
          id: '1', title: 'Archived Project 1',
          description: '',
          approvalSignature: '',
          progress: 0,
          plannedStartDate:  new Date(),
          plannedEndDate:  new Date(),
          createdAt: ''
        },
        {
          id: '2', title: 'Archived Project 2',
          description: '',
          approvalSignature: '',
          progress: 0,
          plannedStartDate: new Date(),
          plannedEndDate: new Date(),
          createdAt:  new Date().toDateString()
        },
      ];

      service.getAllArchived().subscribe((projects) => {
        expect(projects).toEqual(mockProjects);
      });

      const req = httpMock.expectOne(`${apiUrl}/archived`);
      expect(req.request.method).toBe('GET');
      req.flush(mockProjects);
    });
  });

  describe('getById', () => {
    it('should fetch a single project by ID', () => {
      const mockProject: Project = {
        id: '1', title: 'Test Project 1',
        description: '',
        approvalSignature: '',
        progress: 0,
        plannedStartDate:  new Date(),
        plannedEndDate:  new Date(),
        createdAt: ''
      };



      service.getById('1').subscribe((project) => {
        expect(project).toEqual(mockProject);
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockProject);
    });
  });

  describe('create', () => {
    it('should create a new project', () => {
      const mockProject: Project = {
        id: '1', title: 'New Project',
        description: '',
        approvalSignature: '',
        progress: 0,
        plannedStartDate:  new Date(),
        plannedEndDate:  new Date(),
        createdAt: ''
      };

      service.create({ title: 'New Project' }).subscribe((project) => {
        expect(project).toEqual(mockProject);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ title: 'New Project' });
      req.flush(mockProject);
    });
  });

  describe('update', () => {
    it('should update an existing project', () => {
      service.update('1', { title: 'Updated Project' }).subscribe(response => {
        expect(response).toBeUndefined();
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toEqual({ title: 'Updated Project' });
      req.flush(null);
    });
  });

  describe('delete', () => {
    it('should delete a project', () => {
      service.delete('1').subscribe(response => {
        expect(response).toBeUndefined();
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });

  describe('deleteMany', () => {
    it('should delete multiple projects', () => {
      const ids = ['1', '2', '3'];

      service.deleteMany(ids).subscribe(response => {
        expect(response).toBeUndefined();
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('DELETE');
      expect(req.request.body).toEqual(ids);
      req.flush(null);
    });
  });
});

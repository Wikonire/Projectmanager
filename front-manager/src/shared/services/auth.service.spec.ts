import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { User } from '../interfaces/user.model';

jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn()
}));

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  describe('login', () => {
    it('should send login request and store user on success', () => {
      const mockToken = 'mocked-jwt-token';
      const mockResponse = { access_token: mockToken };
      const mockDecoded = { username: 'testuser', sub: '123', exp: 999999, roles: [{ name: 'admin' }] };

      (jwtDecode as jest.Mock).mockReturnValue(mockDecoded);

      service.login({ username: 'testuser', password: 'password' }).subscribe();
      const req = httpMock.expectOne('http://localhost:3000/auth/login');
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);

      expect(localStorage.getItem('authToken')).toBe(mockToken);
      expect(service['userSubject'].value).toEqual({ id: '123', name: 'testuser', roles: [{ name: 'admin' }] });
    });
  });

  describe('logout', () => {
    it('should clear token and user data', () => {
      localStorage.setItem('authToken', 'mocked-jwt-token');
      service['userSubject'] = new BehaviorSubject<User | undefined>({ id: '123', name: 'testuser', roles: [] });

      service.logout();
      expect(localStorage.getItem('authToken')).toBeNull();
      expect(service['userSubject'].value).toBeUndefined();
    });
  });

  describe('isLoggedIn', () => {
    it('should return true if token exists', () => {
      localStorage.setItem('authToken', 'mocked-jwt-token');
      expect(service.isLoggedIn()).toBe(true);
    });

    it('should return false if no token exists', () => {
      expect(service.isLoggedIn()).toBe(false);
    });
  });

  describe('loadUserIdFromStorage', () => {
    it('should load and decode stored token', () => {
      const mockToken = 'mocked-jwt-token';
      const mockDecoded = { username: 'testuser', sub: '123', exp: 999999, roles: [{ name: 'admin' }] };
      localStorage.setItem('authToken', mockToken);
      (jwtDecode as jest.Mock).mockReturnValue(mockDecoded);

      service['loadUserIdFromStorage']();

      expect(service['userSubject'].value).toEqual({ id: '123', name: 'testuser', roles: [{ name: 'admin' }] });
    });

    it('should remove invalid token from localStorage', () => {
      localStorage.setItem('authToken', 'invalid-token');
      (jwtDecode as jest.Mock).mockImplementation(() => { throw new Error('Invalid token'); });

      service['loadUserIdFromStorage']();

      expect(localStorage.getItem('authToken')).toBeNull();
      expect(service['userSubject'].value).toBeUndefined();
    });
  });
});

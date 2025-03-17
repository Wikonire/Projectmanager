import { Injectable } from '@angular/core';
import {User} from '../interfaces/user.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private readonly http: HttpClient) { }

  private apiUrl = 'http://localhost:3000/employees';

  /** Alle User abrufen */
  getAll(): Observable<any> {
    return this.http.get<User[]>(this.apiUrl);
  }

  /** Einzelne User abrufen */
  getById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  /** Neue User erstellen */
  create(name: string): Observable<User> {
    return this.http.post<User>(this.apiUrl, { name });
  }

  /** User löschen */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}

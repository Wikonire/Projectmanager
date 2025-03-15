import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Project } from '../interfaces/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:3000/projects';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  /** Alle aktiven Projekte abrufen */
  getAllActive(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/active`)
      .pipe(catchError(this.handleError));
  }

  /** Alle archivierten Projekte abrufen */
  getAllArchived(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/archived`)
      .pipe(catchError(this.handleError));
  }

  /** Ein einzelnes Projekt abrufen */
  getById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  /** Neues Projekt erstellen */
  create(projectDto: Partial<Project>): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, projectDto)
      .pipe(catchError(this.handleError));
  }

  /** Projekt aktualisieren */
  update(id: string, projectDto: Partial<Project>): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}`, projectDto)
      .pipe(catchError(this.handleError));
  }

  /** Einzelnes Projekt löschen */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  /** Mehrere Projekte auf einmal löschen */
  deleteMany(ids: string[]): Observable<void> {
    return this.http.delete<void>(this.apiUrl, { ...this.httpOptions, body: ids })
      .pipe(catchError(this.handleError));
  }

  /** Fehlerbehandlung für HTTP-Anfragen */
  private handleError(error: any) {
    console.error('API-Fehler:', error);
    return throwError(() => new Error(error?.message || 'Server-Fehler'));
  }
}

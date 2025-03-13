import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PhaseName {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class PhaseNameService {
  private readonly apiUrl = 'http://localhost:3000/phase-name'; // API-URL anpassen, falls nötig

  constructor(private http: HttpClient) {}

  /** Alle Phasen abrufen */
  getAll(): Observable<PhaseName[]> {
    return this.http.get<PhaseName[]>(this.apiUrl);
  }

  /** Einzelne Phase abrufen */
  getById(id: string): Observable<PhaseName> {
    return this.http.get<PhaseName>(`${this.apiUrl}/${id}`);
  }

  /** Neue Phase erstellen */
  create(name: string): Observable<PhaseName> {
    return this.http.post<PhaseName>(this.apiUrl, { name });
  }

  /** Phase löschen */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

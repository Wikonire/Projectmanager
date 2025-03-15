import { Injectable } from '@angular/core';
import {map, Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {PhaseName, PhaseStatus, ProjectPhase} from '../interfaces/project-phase.model';
import {Document} from '../interfaces/document.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectPhaseService {
  private apiUrl = 'http://localhost:3000/phases';

  constructor(private http: HttpClient) { }

  getPhaseById(id:string): Observable<ProjectPhase> {
    return this.http.get<ProjectPhase>(`${this.apiUrl}/${id}`)
      .pipe(
      map((response:ProjectPhase) => {
        console.log(response);
       return {
         id: response.id,
         phaseName: response.phaseName,
         progress: response.progress,
         plannedStartDate: new Date(response.plannedStartDate),
         plannedEndDate:  new Date(response.plannedEndDate),
         actualStartDate: response.actualStartDate ? new Date(response.actualStartDate) : undefined,
         actualEndDate: response.actualEndDate ? new Date(response.actualEndDate) : undefined,
         phaseStatus: response.phaseStatus,
         documents: response.documents ? response.documents : []
        }
      }),
        catchError(this.handleError));
  }

  //
  updatePhase(phase: Partial<ProjectPhase>): Observable<ProjectPhase> {
    const phaseId = phase['id'];
    const { id,  documents, ...rest } = phase;
    return this.http.put<ProjectPhase>(`${this.apiUrl}/${phaseId}`, rest)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('API-Fehler:', error);
    return throwError(() => new Error(error?.message || 'Server-Fehler'));
  }
}

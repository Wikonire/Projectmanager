import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../interfaces/project.model';
import {ProjectStatus} from '../interfaces/status.model';
import {Priority} from '../interfaces/priority.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:3000/projects'; // API-Endpunkt

  constructor(private http: HttpClient) {}

  createProject(): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, {});
  }

  /**
   * Holt alle Projekte von der API.
   * Gibt ein Observable mit einer Liste von Projekten zurück.
   */
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }


  getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  deleteProject(project: Project): Observable<Project> {
    project.status = {name:'Archiviert'}
    return this.updateProject(project);
  }

  updateProject(project: Project): Observable<Project> {
    console.log(project.progress);
    const updateProjectDto: Partial<Project> = {};
    console.log(project.progress)
    if (project.title) updateProjectDto.title = project.title;
    if (project.description) updateProjectDto.description = project.description;

    if (project.progress !== undefined && project.progress !== null) {
      console.log(project.progress)
      if (updateProjectDto.progress) {
        updateProjectDto.progress = 0;
      }
    }

    if (project.approvalDate) {
      updateProjectDto.approvalDate = new Date(project.approvalDate);
    }

    if (project.plannedStartDate) {
      updateProjectDto.plannedStartDate = new Date(project.plannedStartDate);
    }

    if (project.plannedEndDate) {
      updateProjectDto.plannedEndDate = new Date(project.plannedEndDate);
    }

    if (project.actualStartDate) {
      updateProjectDto.actualStartDate = new Date(project.actualStartDate);
    }

    if (project.actualEndDate) {
      updateProjectDto.actualEndDate = new Date(project.actualEndDate);
    }

    if (project.priority) {
      updateProjectDto.priority = { name: project.priority.name } as Partial<Priority>;
    }

    if (project.status) {
      updateProjectDto.status = { name: project.status.name };
    }

    if (project.methodology) {
      updateProjectDto.methodology = { name: project.methodology.name };
    }

    console.log("🔄 Patch DTO:", updateProjectDto);

    return this.http.patch<Project>(`http://localhost:3000/projects/${project.id}`, updateProjectDto);
  }


}

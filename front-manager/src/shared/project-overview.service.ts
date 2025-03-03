import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IProject} from '../app/interfaces/project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectOverviewService {
  constructor(private readonly httpClient: HttpClient) { }

  //public getProjects():Observable<IProject[]> {
    //return this.httpClient.get<IProject[]>('http://localhost:3000/projects');
  //}
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ProjectStatus} from '../interfaces/status.model';


@Injectable({
  providedIn: 'root',
})
export class StatusNameService {
  private readonly apiUrl = 'http://localhost:3000/status-names'; // API-URL anpassen, falls nötig

  constructor(private http: HttpClient) {}

  getAll(): Observable<ProjectStatus[]> {
    return this.http.get<ProjectStatus[]>(this.apiUrl);
  }

}

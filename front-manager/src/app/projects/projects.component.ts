import {Component, OnInit} from '@angular/core';
import {ProjectOverviewService} from '../../shared/project-overview.service';
import {IProject} from '../interfaces/project.interface';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  standalone: false,
})
export class ProjectsComponent implements OnInit {

  public projects: Observable<IProject[]>|undefined = undefined;

  constructor(private readonly projectsService: ProjectOverviewService) {
  }
    ngOnInit(): void {
         //this.projects = this.projectsService.getProjects();
  }

}

import {Component, OnInit} from '@angular/core';
import {GanttItem} from '@worktile/gantt';
import {ProjectService} from '../../shared/services/project.service';
import {map} from 'rxjs';
import {Project} from '../../shared/interfaces/project.model';

@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrl: './gantt.component.scss'
})
export class GanttComponent implements OnInit {

  items: GanttItem[] = [];

  constructor(private readonly projectService: ProjectService) {
  }

  ngOnInit() {
    this.projectService.getAllActive()
      .pipe(
        map(projects => {
          console.log(projects.map(project => project.projectPhases?.map(phase => phase.activities)))
          return projects
        }),
        map((projects: Project[]) =>
          projects.map(project => ({
            id: project.id,
            title: project.title || 'Unknown',
            start: new Date(project.plannedStartDate),
            end: new Date(project.plannedEndDate),
            progress: parseFloat(project.progress.toString()) || 0,
            expandable: project.projectPhases && project.projectPhases.length > 0,
            children: project.projectPhases?.map(phase => ({
              id: phase.id,
              title: phase.phaseName?.name ?? 'Unknown Phase',
              start: new Date(phase.plannedStartDate),
              end: new Date(phase.plannedEndDate),
              expandable: true,
              progress: parseFloat(phase.progress.toString()) || 0,
              children: phase.activities?.map(activity => ({

                  id: activity.id,
                  title:
                    activity.title ?? 'Unknown Activity title',
                  start:
                    new Date(activity.plannedStartDate),
                  end:
                    new Date(activity.plannedEndDate),
                  progress:
                    parseFloat(activity.progress.toString()) || 0,

              }))
            })) || []
          }))
        )
      )
      .subscribe(projects => {
        console.log(projects);
        this.items = projects;
      });
  }
}

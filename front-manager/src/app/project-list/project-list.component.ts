import {Component, EnvironmentInjector, inject, OnInit, ViewChild} from '@angular/core';
import {Project, ProjectOverviewData} from '../../shared/interfaces/project.model';
import {PriorityColorService} from '../../shared/services/priority-color.service';
import {AccessibleTextColorService} from '../../shared/services/accessible-text-color.service';
import {ProjectService} from '../../shared/services/project.service';
import {OverviewAction} from '../../shared/interfaces/overview-action.model';
import {DialogComponent} from '../dialog/dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {OverviewComponent} from '../overview/overview.component';



@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  @ViewChild(OverviewComponent) overviewComponent!: OverviewComponent<ProjectOverviewData>;
  projectOverviewData: ProjectOverviewData[] = [];
  displayedColumns = [
    {name: 'title', label: 'Titel'},
    {name: 'description', label: 'Beschreibung'},
    {name: 'progress', label: 'Fortschritt'},
    {name: 'plannedStartDate', label: 'Geplantes Startdatum'},
    {name: 'plannedEndDate', label: 'Geplantes Enddatum'},
    {name: 'priority', label: 'Priorität'},
    {name: 'detail', label: 'Detailsicht'},
    {name: 'edit', label: 'Bearbeiten'}
  ];
  title = 'Projekt-Liste';
  actions: OverviewAction<ProjectOverviewData>[] = [
    {
      label: 'Löschen',
      icon: 'delete',
      action: (selectedProjects) => this.confirmDeleteProjects(selectedProjects.map(p => p as unknown as Project)),
      showIfAllSelected: false
    }
  ];
  projects: Project[] = [];

  constructor(
    private priorityColorService: PriorityColorService,
    private accessibleTextColorService: AccessibleTextColorService,
    private projectService: ProjectService,
    private matDialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.loadProjects();
  }

  confirmDeleteProjects(selectedProjects: Project[]) {
    console.log('Zu löschende Projekte:', selectedProjects);
    const dialogRef = this.matDialog.open(DialogComponent, {
      data: {
        dialogContent: `Wirklich ${selectedProjects.length} Projekt${selectedProjects.length > 1 ? 'e' : ''} löschen?`,
        dialogTitle: `Löschen`,
        dialogActionButton: {label: 'Löschen', icon: 'delete'},
        dialogActionCancel: {label: "Abbrechen", icon: 'cancel'}
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result === true) {
        this.deleteProject(selectedProjects);
        dialogRef.close();
      }
    })
  }

  private loadProjects() {
    this.projectService.getProjects().subscribe((projects: Project[]) => {
      this.projects = projects;
      const priorityColors = this.priorityColorService.getPriorityColors(projects);

      this.projectOverviewData = projects.map(project => {
        const bgColor = project?.priority?.name && priorityColors[project?.priority?.name] || '#ccc';
        const textColor = this.accessibleTextColorService.getAccessibleTextColor(bgColor);

        return {
          id: project.id,
          title: project.title,
          description: project.description || undefined,
          progress: project.progress ?? 0,
          plannedStartDate: project.plannedStartDate,
          plannedEndDate: project.plannedEndDate,
          priority: {
            name: project?.priority?.name,
            style: {
              background: bgColor,
              color: textColor,
              padding: '4px 8px',
              borderRadius: '4px'
            }
          }
        };
      });
    });
  }

  private deleteProject(projects: Project[]): void {
    for (const p of projects) {
      this.projectService.deleteProject(p).subscribe((data) => {
      });
    }
    const dialogRef = this.matDialog.open(DialogComponent, {
      data: {
        dialogContent: `${projects.length > 1 ? 'Das' : 'Die'} ${projects.length} Projekt${projects.length > 1 ? 'e' : ''} wurde${projects.length > 1 ? 'en' : 'e'} erfolgreich gelöscht.`,
        dialogTitle: "Erfolgreich gelöscht",
        dialogActionCancelLabel: "Zur Projekt-Übersicht zurückkehren"
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result === true) {
        for (const project of projects) {
          this.projectService.deleteProject(project);
        }
        dialogRef.close();
        this.router.navigate(['/projects']);

      } else {

      }
    });

  }

  onEdit($event:ProjectOverviewData) {
    this.router.navigate([`/projects/${$event.id}`]);
  }

  onDetail($event: ProjectOverviewData) {
    this.router.navigate([`/projects/${$event.id}`]);
  }
}

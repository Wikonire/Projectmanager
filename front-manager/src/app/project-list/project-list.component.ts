import {Component, EnvironmentInjector, inject, OnInit, ViewChild} from '@angular/core';
import {Project, ProjectOverviewData} from '../../shared/interfaces/project.model';
import {PriorityColorService} from '../../shared/services/priority-color.service';
import {AccessibleTextColorService} from '../../shared/services/accessible-text-color.service';
import {ProjectService} from '../../shared/services/project.service';
import {OverviewAction, OverviewColumn} from '../../shared/interfaces/overview-action.model';
import {DialogComponent} from '../dialog/dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {OverviewComponent} from '../overview/overview.component';
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  @ViewChild(OverviewComponent) overviewComponent!: OverviewComponent<ProjectOverviewData>;
  projectOverviewData: ProjectOverviewData[] = [];
  displayedColumns:OverviewColumn[]= [
    {name: 'title', label: 'Titel', type: undefined},
    {name: 'description', label: 'Beschreibung', type: undefined},
    {name: 'progress', label: 'Fortschritt in %',type: undefined},
    {name: 'plannedStartDate', label: 'Geplantes Startdatum', type: 'date'},
    {name: 'plannedEndDate', label: 'Geplantes Enddatum', type: 'date'},
    {name: 'priority', label: 'Priorität', type: undefined},
    {name: 'detail', label: 'Detailsicht', type: undefined},
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
    private router: Router,
    private snackBar: MatSnackBar
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
      console.log('Dialog geschlossen:', result);
      if (result !== undefined && result === true) {
        this.deleteProject(selectedProjects);
        dialogRef.close();
      }
    })
  }

  private loadProjects() {
    this.projectService.getAllActive().subscribe((projects: Project[]) => {
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
    this.projectService.deleteMany(projects.map(project => project.id)).subscribe({
      next: () => {
        this.loadProjects();
        this.snackBar.open(
          `${projects.length > 1 ? 'Die' : 'Das'} ${projects.length} Projekt${projects.length > 1 ? 'e' : ''} wurde${projects.length > 1 ? 'en' : 'e'} erfolgreich gelöscht.`,
          'Schließen',
          { duration: 3000 } // Snackbar verschwindet nach 3 Sekunden
        );
      },
      error: (error) => {
        console.error('Fehler beim Löschen der Projekte:', error);
        this.snackBar.open(
          'Fehler beim Löschen der Projekte. Bitte versuche es erneut.',
          'Schließen',
          { duration: 4000, panelClass: ['snackbar-error'] } // Optional: Fehler-Design
        );
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

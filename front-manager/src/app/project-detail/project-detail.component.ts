import {Component, ComponentRef, Injector, model, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Project} from '../../shared/interfaces/project.model';
import {ProjectService} from '../../shared/services/project.service';
import {AccessibleTextColorService} from '../../shared/services/accessible-text-color.service';
import {PriorityColorService} from '../../shared/services/priority-color.service';
import {DialogComponent} from '../dialog/dialog.component';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {ProjectPhase} from '../../shared/interfaces/project-phase.model';
import {EDIT_PHASE_DATA_TOKEN} from '../../shared/utils/edit-phase.token';
import {ComponentPortal} from '@angular/cdk/portal';
import {EditPhaseComponent} from '../phase-list/edit-phase/edit-phase.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project!: Project;
  private overlayRef!: OverlayRef;
  editForm!: FormGroup;
  isProjectEditing = false;
  priorityColor: string = '';
  readonly onClickActionButton = model(true);

  constructor(private route: ActivatedRoute,
              private projectService: ProjectService,
              private fb: FormBuilder,
              private readonly textColorService: AccessibleTextColorService,
              private readonly priorityColorService: PriorityColorService,
              private overlay: Overlay, private injector: Injector,
              private matDialog: MatDialog,
              private router: Router
              ) {
  }

  ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get('id');
    // this.priorityColor = this.route.snapshot.paramMap.get('priorityColor') || 'grey';
    if (projectId) {
      this.loadProject(projectId);

    }
  }

  openDialog(phase: ProjectPhase): void {
    // Overlay erstellen
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    });

    // Injector für Daten erstellen
    const injector = Injector.create({
      providers: [{ provide: EDIT_PHASE_DATA_TOKEN, useValue: phase, deps: [] }],
      parent: this.injector
    });
    // Component in Overlay einfügen
    const portal = new ComponentPortal(EditPhaseComponent, null, injector);
    const componentRef: ComponentRef<EditPhaseComponent> = this.overlayRef.attach(portal);

    // Schließen, wenn das Overlay außerhalb geklickt wird
    this.overlayRef.backdropClick().subscribe(() => this.closeDialog());
  }

  closeDialog(): void {
    this.overlayRef.dispose();
  }

  loadProject(id: string) {
    this.projectService.getProjectById(id).subscribe({
      next: (data: Project) => {
        this.project = data;
        this.initializeForm();
      }, error: (error: any) => console.error('Fehler beim Laden des Projekts:', error)
    });
  }

  initializeForm() {
    this.editForm = this.fb.group({
      title: [this.project.title, Validators.required],
      description: [this.project.description, Validators.required],
      progress: [this.project.progress, [Validators.required, Validators.min(0), Validators.max(100)]],
      plannedStartDate: [this.project.plannedStartDate, Validators.required],
      plannedEndDate: [this.project.plannedEndDate, Validators.required]
    });
  }

  toggleEdit() {
    this.isProjectEditing = !this.isProjectEditing;
  }

  saveChanges() {
    if (this.editForm.valid) {
      const updatedProject = {...this.project, ...this.editForm.value};
      console.log(updatedProject)

      this.projectService.updateProject(updatedProject).subscribe({
        next: () => {
          this.project = updatedProject;
          this.isProjectEditing = false;
        }, error: (error: any) => console.error('Fehler beim Speichern des Projekts:', error)
      });
    }
  }

  cancelEdit() {
    this.isProjectEditing = false;
    this.initializeForm(); // Zurücksetzen auf ursprüngliche Werte
  }

  getTextColor(priority: string): string {
    return this.textColorService.getAccessibleTextColor(this.priorityColor);
  }

  private deleteProject(project:Project):void {
    this.projectService.deleteProject(project).subscribe((data) => {
      const dialogRef = this.matDialog.open(DialogComponent, {
        data: {
          dialogContent: `Das Projekt "${this.project.title}" wurde erfolgreich gelöscht.`,
          dialogTitle: "Erfolgreich gelöscht",
          dialogActionButtonLabel: 'Rückgängig machen',
          dialogActionCancelLabel: "Zur Projekt-Übersicht zurückkehren"
        },
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined && result === true) {
          this.projectService.deleteProject(project);
          dialogRef.close();
          this.router.navigate(['/projects', project.id]);

        } else {

        }
      });

    });
  }

  openDeleteConfirmationDialog() {
    const dialogRef = this.matDialog.open(DialogComponent, {
      data: {
        dialogContent: `Willst du das Projekt mit dem Titel "${this.project.title}" wirklich endgültig löschen?`,
        dialogTitle: "Projekt löschen?",
        dialogActionButtonLabel: 'Löschen',
        dialogActionCancelLabel: "Abbrechen"
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result === true) {
        this.deleteProject(this.project);
        dialogRef.close();
      }
    });


  }
}

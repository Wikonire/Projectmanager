import {Component, model, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Project} from '../../shared/interfaces/project.model';
import {ProjectService} from '../../shared/services/project.service';
import {DialogComponent} from '../dialog/dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {SnackBarService} from '../../shared/services/snack-bar.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project!: Project;
  editForm!: FormGroup;
  isProjectEditing = false;
  readonly onClickActionButton = model(true);

  constructor(private route: ActivatedRoute,
              private projectService: ProjectService,
              private fb: FormBuilder,
              private matDialog: MatDialog,
              private snackBarService: SnackBarService,
              private router:Router
  ) {
  }

  ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.loadProject(projectId);

    }
  }

  loadProject(id: string) {
    this.projectService.getById(id).subscribe({
      next: (data: Project) => {
        this.project = data;
        this.initializeForm();
        console.log(this.project.leader)
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

  displayProgress(value:number):string {
    return `${value}%`
  }

  onProgressChange($event: number) {
    const statusControl = this.editForm?.get('progress');
    statusControl?.setValue($event);
  }

  toggleEdit() {
    this.isProjectEditing = !this.isProjectEditing;
  }

  saveChanges() {
    if (this.editForm.valid) {
      const updatedProject = {...this.project, ...this.editForm.value};

      this.projectService.update(updatedProject.id, updatedProject).subscribe({
        next: () => {
          this.snackBarService.showSuccess('gespeichert');
          this.isProjectEditing = false;
          this.router.navigate([`/project-list`]);
        },
        error: (error) => {
          this.snackBarService.showError(error, 'Speichern');
        }
      });
    }
  }

  cancelEdit() {
    const updatedProject = {...this.project, ...this.editForm.value};
    this.isProjectEditing = false;
    this.initializeForm(); // Zurücksetzen auf ursprüngliche Werte
  }

  openDeleteConfirmationDialog() {
    const dialogRef = this.matDialog.open(DialogComponent, {
      data: {
        dialogContent: `Willst du das Projekt mit dem Titel "${this.project.title}" wirklich endgültig löschen?`,
        dialogTitle: "Projekt löschen?",
        dialogActionButton: {label:'Löschen'},
        dialogActionCancel: {label: "Abbrechen"}
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result === true) {
        this.deleteProject(this.project);
        this.router.navigate(['/project-list']);
        dialogRef.close();
      }
    });


  }

  private deleteProject(project: Project): void {
    this.projectService.delete(project.id).subscribe({
      next: () => {
        this.snackBarService.showSuccess('gelöscht');
      },
      error: (error) => {
        this.snackBarService.showError(error, 'Löschen');
      }
    });
  }

}

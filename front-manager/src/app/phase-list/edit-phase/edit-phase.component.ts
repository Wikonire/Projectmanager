import {AfterViewInit, Component, Inject, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {map, Observable, startWith, Subject} from 'rxjs';

import {PhaseName, ProjectPhase} from '../../../shared/interfaces/project-phase.model';
import {PhaseNameService} from '../../../shared/services/phase-name.service';
import {StatusNameService} from '../../../shared/services/status-name.service';
import {ProjectStatus} from '../../../shared/interfaces/status.model';
import {ProjectPhaseService} from '../../../shared/services/project-phase.service';
import {DialogComponent} from '../../dialog/dialog.component';

@Component({
  selector: 'app-edit-phase',
  templateUrl: './edit-phase.component.html',
  styleUrls: ['./edit-phase.component.scss']
})
export class EditPhaseComponent implements OnInit {
  phaseNamesOptions: PhaseName[] = [];
  statusNamesOptions: ProjectStatus[] = [];
  filteredPhaseNameOptions$?: Observable<string[]>;
  filteredStatusNameOptions$?: Observable<string[]>;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditPhaseComponent>,
    private phaseNameService: PhaseNameService,
    private phaseService: ProjectPhaseService,
    private statusNameService: StatusNameService,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private cancelDialog:MatDialog
  ) {
  }
  phase: ProjectPhase = {} as ProjectPhase;
  phaseFormGroup!: FormGroup;

  ngOnInit(): void {

this.setupForm();

  }

  private setupForm(): void {
    if (!this.data) {
      this.phase.id = '';
      this.phase.phaseStatus = {name:'', id:undefined};
      this.phase.phaseName = {name:'', id:undefined};
      this.phase.phaseName.name = '';
      this.phase.actualStartDate = new Date();
      this.phase.actualEndDate = new Date();
      this.phase.plannedStartDate = new Date();
      this.phase.plannedEndDate = new Date();
      this.phase.progress = 0;
    } else  {
      this.phaseService.getPhaseById(this.data).subscribe((phase:ProjectPhase) => {
        this.phase = phase;

        if (this.phaseFormGroup) {
          console.log("patchValue")
          this.phaseFormGroup.patchValue({
            phaseNameControl: this.phase?.phaseName?.name ?? '',
            plannedStartDateControl: this.phase?.plannedStartDate ?? null,
            plannedEndDateControl: this.phase?.plannedEndDate ?? null,
            actualStartDateControl: this.phase?.actualStartDate ?? null,
            actualEndDateControl: this.phase?.actualEndDate ?? null,
            phaseStatusControl: this.phase?.phaseStatus?.name ?? '',
            progressControl: this.phase?.progress ?? 0.00
          });
        }

      })
    }

    this.phaseFormGroup = this.fb.group({
      phaseNameControl: [this.phase.phaseName?.name || '', Validators.required],
      plannedStartDateControl: [this.phase?.plannedStartDate || null, Validators.required],
      plannedEndDateControl: [this.phase?.plannedEndDate || null, Validators.required],
      actualStartDateControl: [this.phase?.actualStartDate || null],
      actualEndDateControl: [this.phase?.actualEndDate || null],
      phaseStatusControl: [this.phase?.phaseStatus?.name || '', Validators.required],
      progressControl: [this.phase?.progress || 0, Validators.required]
    });
    this.setupFilters();
  }

  private setupFilters():void {
    this.getPhaseNames();
    this.getStatusNames();
    this.filteredStatusNameOptions$ = this.phaseFormGroup!.get('phaseStatusControl')!.valueChanges.pipe(
      startWith(''),
      map(value => this.filterProjectStatusNames(value || ''))

    );

    this.filteredPhaseNameOptions$ = this.phaseFormGroup!.get('phaseNameControl')!.valueChanges.pipe(
      startWith(''),
      map(value => this.filterPhaseNames(value || ''))
    );
  }

  onSave(): void {
    console.log(this.phaseFormGroup.get('progressControl')?.dirty);
    if (this.phaseFormGroup?.valid && this.phaseFormGroup?.dirty) {
      this.phase.phaseStatus.name = this.phaseFormGroup.value.phaseNameControl;
      this.phase.phaseName.name = this.phaseFormGroup.value.phaseNameControl;
      this.phase.actualStartDate = new Date(this.phaseFormGroup.value.actualStartDateControl);
      this.phase.actualEndDate = new Date(this.phaseFormGroup.value.actualEndDateControl);
      this.phase.plannedStartDate = new Date(this.phaseFormGroup.value.plannedStartDateControl);
      this.phase.plannedEndDate = new Date(this.phaseFormGroup.value.plannedEndDateControl);
      this.phase.progress =this.phaseFormGroup.value.progressControl.value;
      this.dialogRef.close(this.phase);
    } else {this.dialogRef.close();}
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private getPhaseNames(): void {
    this.phaseNameService.getAll().subscribe((data: PhaseName[]) => {
      this.phaseNamesOptions = data;
    });
  }

  private getStatusNames(): void {
    this.statusNameService.getAll().subscribe((data: ProjectStatus[]) => {
      if (data) {
        this.statusNamesOptions = data;
      }
    });
  }

  private filterProjectStatusNames(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.statusNamesOptions
      .map(statusName => statusName.name ?? '')
      .filter(name => name?.toLowerCase()?.includes(filterValue));
  }

  private filterPhaseNames(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.phaseNamesOptions
      .map(phaseName => phaseName.name ?? '')
      .filter(name => name?.toLowerCase()?.includes(filterValue));
  }



  displayProgress(value:number):string {
    return `${value}%`
  }

  onProgressChange($event: number) {
    const statusControl = this.phaseFormGroup?.get('progressControl');
    statusControl?.setValue($event);
  }
}

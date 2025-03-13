import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {map, Observable, startWith} from 'rxjs';

import {PhaseName, ProjectPhase} from '../../../shared/interfaces/project-phase.model';
import {PhaseNameService} from '../../../shared/services/phase-name.service';

@Component({
  selector: 'app-edit-phase',
  templateUrl: './edit-phase.component.html',
  styleUrls: ['./edit-phase.component.scss']
})
export class EditPhaseComponent implements OnInit {
  phaseFormGroup: FormGroup;
  phaseNamesOptions: PhaseName[] = [];
  filteredOptions$: Observable<string[]> = new Observable<string[]>();

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<EditPhaseComponent>,
              private phaseNameService: PhaseNameService,
              @Inject(MAT_DIALOG_DATA) public data: { phase: ProjectPhase}
  ) {
    this.phaseFormGroup = this.fb.group({
      progress: [data.phase.progress, [Validators.required, Validators.min(0), Validators.max(100)]],
      plannedStartDate: [data.phase.plannedStartDate, Validators.required],
      plannedEndDate: [data.phase.plannedEndDate, Validators.required],
      actualStartDate: [data.phase.actualStartDate],
      actualEndDate: [data.phase.actualEndDate],
      phaseName: [data.phase.phaseName.id, Validators.required],
      status: [data.phase.status, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getPhaseNames();
    this.filteredOptions$ = this.phaseFormGroup.get('phaseName')!.valueChanges.pipe(startWith(''), map(value => this._filter(value || '')));
  }

  onSave(): void {
    if (this.phaseFormGroup.valid) {
      this.dialogRef.close({...this.data.phase, ...this.phaseFormGroup.value});
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private getPhaseNames(): void {
    this.phaseNameService.getAll().subscribe((data: PhaseName[]) => {
      this.phaseNamesOptions = data;
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.phaseNamesOptions
      .map(phaseName => phaseName.name)
      .filter(option => option.toLowerCase().includes(filterValue));
  }
}

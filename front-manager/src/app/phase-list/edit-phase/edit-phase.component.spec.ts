import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPhaseComponent } from './edit-phase.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { MatOptionModule } from '@angular/material/core';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { PhaseNameService } from '../../../shared/services/phase-name.service';
import { ProjectPhaseService } from '../../../shared/services/project-phase.service';
import { StatusNameService } from '../../../shared/services/status-name.service';

describe('EditPhaseComponent', () => {
  let component: EditPhaseComponent;
  let fixture: ComponentFixture<EditPhaseComponent>;

  // Mock-Services
  const phaseNameServiceMock = {
    getPhaseNames: jasmine.createSpy('getPhaseNames').and.returnValue(of([{ name: 'Planung' }])),
  };

  const projectPhaseServiceMock = {
    getPhaseById: jasmine.createSpy('getPhaseById').and.returnValue(of({
      id: '1',
      phaseName: { id: '1', name: 'Planung' },
      phaseStatus: { id: '2', name: 'In Bearbeitung' },
      actualStartDate: new Date(),
      actualEndDate: new Date(),
      plannedStartDate: new Date(),
      plannedEndDate: new Date(),
      progress: 50,
    })),
  };

  const statusNameServiceMock = {
    getStatusNames: jasmine.createSpy('getStatusNames').and.returnValue(of([{ name: 'In Bearbeitung' }])),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPhaseComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatButtonModule,
        MatListModule,
        MatAutocompleteModule,
        MatDialogModule,
        MatSliderModule,
        MatOptionModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MAT_DIALOG_DATA, useValue: '1' }, // Beispiel: Phase-ID
        { provide: PhaseNameService, useValue: phaseNameServiceMock },
        { provide: ProjectPhaseService, useValue: projectPhaseServiceMock },
        { provide: StatusNameService, useValue: statusNameServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(EditPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with data if available', () => {
    // Rufe den Mock auf (getPhaseById wird gemockt)
    expect(projectPhaseServiceMock.getPhaseById).toHaveBeenCalledWith('1');
    expect(component.phaseFormGroup.value).toEqual({
      phaseNameControl: 'Planung',
      plannedStartDateControl: jasmine.any(Date),
      plannedEndDateControl: jasmine.any(Date),
      actualStartDateControl: jasmine.any(Date),
      actualEndDateControl: jasmine.any(Date),
      phaseStatusControl: 'In Bearbeitung',
      progressControl: 50,
    });
  });

  it('should validate the form fields', () => {
    const form = component.phaseFormGroup;

    // Ungültiges Formular
    form.patchValue({
      phaseNameControl: '',
      plannedStartDateControl: null,
      plannedEndDateControl: null,
      phaseStatusControl: '',
      progressControl: null,
    });

    expect(form.valid).toBe(false);
    expect(form.errors).toEqual(
      {
        phaseNameControl: { required: true },
        plannedStartDateControl: { required: true },
        plannedEndDateControl: { required: true },
        phaseStatusControl: { required: true },
        progressControl: { required: true },
      }
    );

    // Gültiges Formular
    form.patchValue({
      phaseNameControl: 'Planung',
      plannedStartDateControl: new Date(),
      plannedEndDateControl: new Date(),
      phaseStatusControl: 'In Bearbeitung',
      progressControl: 50,
    });

    expect(form.valid).toBe(true);
  });

  it('should populate phase name autocomplete options', () => {
    component.setupFilters();
    component.phaseFormGroup.get('phaseNameControl')?.setValue('Pl');
    fixture.detectChanges();

    component.filteredPhaseNameOptions$?.subscribe((options) => {
      expect(options).toEqual(['Planung']);
    });
  });

  it('should populate phase status autocomplete options', () => {
    component.setupFilters();
    component.phaseFormGroup.get('phaseStatusControl')?.setValue('In');
    fixture.detectChanges();

    component.filteredStatusNameOptions$?.subscribe((options) => {
      expect(options).toEqual(['In Bearbeitung']);
    });
  });

  it('should call onSave and close the dialog', () => {
    const dialogSpy = spyOn(component.dialogRef, 'close');
    component.onSave();

    expect(dialogSpy).toHaveBeenCalled();
  });

  it('should call onCancel and close the dialog', () => {
    const dialogSpy = spyOn(component.dialogRef, 'close');
    component.onCancel();

    expect(dialogSpy).toHaveBeenCalled();
  });
});

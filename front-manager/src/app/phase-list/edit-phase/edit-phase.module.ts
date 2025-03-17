import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import {EditPhaseComponent} from './edit-phase.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSliderModule, MatSliderThumb} from '@angular/material/slider';

@NgModule({
  declarations: [EditPhaseComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatListModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatSliderModule,
    MatSliderThumb
  ],
  exports: [EditPhaseComponent]
})
export class EditPhaseModule {
}

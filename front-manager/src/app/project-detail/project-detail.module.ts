import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';

import {ProjectDetailComponent} from './project-detail.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {DocumentListModule} from '../document-list/document-list.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {PhaseListModule} from '../phase-list/phase-list.module';
import {DialogModule} from '../dialog/dialog.module';


@NgModule({
  declarations: [ProjectDetailComponent],
  imports: [
    CommonModule,
    DocumentListModule,

    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatExpansionModule,
    PhaseListModule,
    DialogModule,
  ],
  exports: [ProjectDetailComponent],
})
export class ProjectDetailModule { }

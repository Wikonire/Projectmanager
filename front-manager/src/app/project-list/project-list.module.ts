import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProjectListComponent} from './project-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {OverviewModule} from '../overview/overview.module';

@NgModule({
  declarations: [ProjectListComponent],
    imports: [
        CommonModule,
        MatTableModule,
        MatCardModule,
        MatButtonModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        OverviewModule,
    ],
  exports: [ProjectListComponent]
})
export class ProjectListModule { }

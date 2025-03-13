import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import {MatButtonModule} from '@angular/material/button';
import {
MatTableModule
} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {EditPhaseModule} from './edit-phase/edit-phase.module';
import {MatIconModule} from '@angular/material/icon';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {PhaseListComponent} from './phase-list.component';



@NgModule({
  declarations: [PhaseListComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatExpansionModule,
    MatDialogModule,
    EditPhaseModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule
  ],
  exports: [PhaseListComponent]
})
export class PhaseListModule { }

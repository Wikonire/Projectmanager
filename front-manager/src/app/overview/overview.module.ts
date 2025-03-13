import { NgModule } from '@angular/core';
import {CommonModule, TitleCasePipe} from '@angular/common';
import {OverviewComponent} from './overview.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSortModule} from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltip} from '@angular/material/tooltip';



@NgModule({
  declarations: [OverviewComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatCheckboxModule,
    MatTooltip,
    TitleCasePipe
  ],
  exports: [OverviewComponent]
})
export class OverviewModule { }

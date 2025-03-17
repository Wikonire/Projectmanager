import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GanttComponent} from './gantt.component';
import {NgxGanttModule} from '@worktile/gantt';



@NgModule({
  declarations: [GanttComponent],
  imports: [
    CommonModule,
    NgxGanttModule,
  ], exports: [GanttComponent]
})
export class GanttModule { }

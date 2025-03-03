import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProjectDetailComponent} from './project-detail.component';
import {DhtmlxGanttModule} from '../dhtmlx-gantt/dhtmlx-gantt.module';


@NgModule({
  declarations: [ProjectDetailComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
      DhtmlxGanttModule
  ],
  exports: [ProjectDetailComponent],
})
export class ProjectDetailModule { }

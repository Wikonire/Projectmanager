import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectsComponent} from './projects.component';
import {MatListModule} from '@angular/material/list';


@NgModule({
  declarations: [ProjectsComponent],
  imports: [
    CommonModule,
    MatListModule
  ],
  exports: [ProjectsComponent]
})
export class ProjectsModule { }

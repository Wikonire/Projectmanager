import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeeListComponent} from './employee-list.component';
import {OverviewModule} from '../overview/overview.module';



@NgModule({
  declarations: [EmployeeListComponent],
  imports: [
    CommonModule,
    OverviewModule
  ], exports: [EmployeeListComponent]
})
export class EmployeeListModule { }

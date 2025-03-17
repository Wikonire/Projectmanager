import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ApprovalComponent} from './approval.component';
import {OverviewModule} from '../overview/overview.module';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinner} from '@angular/material/progress-spinner';



@NgModule({
  declarations: [ApprovalComponent],
  imports: [
    CommonModule,
    OverviewModule,
    MatCardModule,
    MatProgressSpinner,
  ], exports: [ApprovalComponent]
})
export class ApprovalModule { }

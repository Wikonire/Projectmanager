import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ApprovalComponent} from './approval.component';
import {OverviewModule} from '../app/overview/overview.module';



@NgModule({
  declarations: [ApprovalComponent],
  imports: [
    CommonModule,
    OverviewModule,
  ], exports: [ApprovalComponent]
})
export class ApprovalModule { }

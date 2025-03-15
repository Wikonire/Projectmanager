import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home.component';
import {OverviewModule} from '../overview/overview.module';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {ApprovalModule} from '../approval/approval.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    OverviewModule,
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    ApprovalModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }

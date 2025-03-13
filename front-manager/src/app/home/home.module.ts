import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home.component';
import {OverviewModule} from '../overview/overview.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    OverviewModule,
    CommonModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }

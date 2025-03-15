import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StartComponent} from './start.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [StartComponent],
  imports: [CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule
  ],
  exports: [StartComponent]
})
export class StartModule {
}

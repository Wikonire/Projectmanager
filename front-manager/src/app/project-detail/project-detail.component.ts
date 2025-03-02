import { Component } from '@angular/core';
import {GanttItem, NgxGanttComponent, NgxGanttTableColumnComponent, NgxGanttTableComponent} from '@worktile/gantt';

@Component({
  selector: 'app-project-detail',
  imports: [
    NgxGanttTableColumnComponent,
    NgxGanttTableComponent,
    NgxGanttComponent
  ],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent {
  items: GanttItem[] = [
    { id: '000000', title: 'Task 0', start: 1627729997, end: 1628421197 },
    { id: '000001', title: 'Task 1', start: 1617361997, end: 1625483597 }
  ];
}

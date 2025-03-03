import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {gantt} from 'dhtmlx-gantt';
import {CommonModule} from '@angular/common';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-dhtmlx-gantt',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './dhtmlx-gantt.component.html',
  styleUrl: './dhtmlx-gantt.component.scss'
})
export class DhtmlxGanttComponent implements OnInit {
  @ViewChild('gantt_here', { static: true }) ganttContainer!: ElementRef;

  ngOnInit(){
    gantt.init(this.ganttContainer.nativeElement);
  }
}

import {Component, inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ProjectPhase} from '../../shared/interfaces/project-phase.model';
import {Document} from '../../shared/interfaces/document.model';
import {MatDialog} from '@angular/material/dialog';
import {EditPhaseComponent} from './edit-phase/edit-phase.component';
import {MatSort, Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';

@Component({
  selector: 'app-phase-list',
  templateUrl: './phase-list.component.html',
  styleUrl: './phase-list.component.scss'
})
export class PhaseListComponent implements OnInit, OnChanges {
  @Input() data: ProjectPhase[] = []
  @Input() popupWidth:string = '800px';
  @Input() type: string = 'projectPhase';
  displayedColumns: string[] = ['phaseName', 'progress', 'actions'];

  @ViewChild(MatSort) sort!: MatSort;

  initialSelection = [];


  allowMultiSelect = true;
  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {

  }

  openPhase(element?: ProjectPhase) {
    if (!element) {
      element = {} as ProjectPhase;
    }
      this.dialog.open(EditPhaseComponent, {
        width: this.popupWidth,
        data: element
      });
  }

}

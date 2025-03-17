import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {ProjectPhase} from '../../shared/interfaces/project-phase.model';
import {MatDialog} from '@angular/material/dialog';
import {EditPhaseComponent} from './edit-phase/edit-phase.component';
import {MatSort, Sort} from '@angular/material/sort';
import {ProjectService} from '../../shared/services/project.service';
import {ProjectPhaseService} from '../../shared/services/project-phase.service';
import {SnackBarService} from '../../shared/services/snack-bar.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-phase-list',
  templateUrl: './phase-list.component.html',
  styleUrl: './phase-list.component.scss'
})
export class PhaseListComponent implements OnInit  {
  @Input() data: ProjectPhase[] = []
  @Input() popupWidth:string = '800px';
  @Input() editMode: boolean = false;
  @Input() type: string = 'projectPhase';
  displayedColumns: string[] = ['phaseName', 'progress', 'actions'];

  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog, private phaseService: ProjectPhaseService,
              private snackBarService: SnackBarService, private activeRoute : ActivatedRoute,
              private router:Router) {
  }
  projectId:string|null = null;

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      this.projectId = params.get('id');
    });

  }


  openPhase(element?: ProjectPhase):void {
    if (!element) {
      element = {} as ProjectPhase;
    }
   const phaseDetailDialogRef = this.dialog.open(EditPhaseComponent, {
        width: this.popupWidth,
        data: element.id
      });
    phaseDetailDialogRef.afterClosed().subscribe((result:ProjectPhase) => {
      if (result) {
       this.phaseService.updatePhase(result).subscribe(
         {
           next: () => {

             this.snackBarService.showSuccess('gespeichert');
               this.router.navigate([`/projects/${this.projectId}`]);
           },
           error: (error) => {
             this.snackBarService.showError(error, 'Speichern');
           }
         }
       )
      }
    });
  }

}

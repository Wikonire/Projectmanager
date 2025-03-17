import {Component, OnInit, ViewChild} from '@angular/core';
import {Project, ProjectOverviewData} from '../../shared/interfaces/project.model';
import {OverviewComponent} from '../overview/overview.component';
import {EmployeesService} from '../../shared/services/employees.service';
import {FlattenedUser} from '../../shared/interfaces/employee.model';
import {map} from 'rxjs';
import {OverviewAction, OverviewColumn} from '../../shared/interfaces/overview-action.model';
import {DialogComponent} from '../dialog/dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-overview',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit {
  @ViewChild(OverviewComponent) overviewComponent!: OverviewComponent<FlattenedUser>;

  constructor(private employeeService: EmployeesService, private matDialog: MatDialog, private router: Router) {
  }
  displayedColumns: OverviewColumn[] = [
    {name: 'username', label: 'Benutzername', type: undefined},
    {name: 'email', label: 'E-Mail', type: undefined},
    {name: 'employeeId', label: 'Mitarbeitenden-Nummer', type: undefined},
    {name: 'firstName', label: 'Vorname', type: undefined},
    {name: 'lastName', label: 'Nachname', type: undefined},
    {name: 'employeeCreatedAt', label: 'Erstellt am', type: 'date'},
    {name: 'detail', label: 'Detailsicht', type: undefined},
    ]
  actions: OverviewAction<FlattenedUser>[] = [
    {
      label: 'Mitarbeitende löschen',
      icon: 'delete',
      action: (selectedEmployees) => this.onDeleteUsers(selectedEmployees.map(p => p as unknown as FlattenedUser)),
      showIfAllSelected: false
    }
  ];
  users: FlattenedUser[] = [];
  title = 'Employee Liste';
  ngOnInit() {
    this.employeeService.getAll().pipe(
      map((employees: FlattenedUser[]) => employees.map((employee) => this.flattenUserObject(employee)))
    )
      .subscribe((employees: FlattenedUser[]) => {

        this.users = employees;
    })
  }

  flattenUserObject(user: any) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      employeeId: user.employee?.id,
      firstName: user.employee?.first_name,
      lastName: user.employee?.last_name,
      employeeCreatedAt: user.employee?.created_at,
      employeePmFunctions: user.employee?.employeePmFunctions?.map((epf:any) => ({
        pmFunctionName: epf.pmFunction?.pmFunctionName,
        workload: epf.workload
      })) || [],
      projectsToLead: user.employee?.projectsToLead?.map((project:any) => ({
        id: project.id,
        title: project.title
      })) || []
    };
  }


  onDeleteUsers(user: FlattenedUser[]) {
    if (user[0]) {
      this.router.navigate(['/employee', user[0].id]);
    }

  }

  onEdit($event: FlattenedUser) {
    console.log($event);
  }

  onDetail($event: FlattenedUser) {
    console.log($event)
  }
}

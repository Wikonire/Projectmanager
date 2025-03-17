import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {ProjectListComponent} from './project-list/project-list.component';
import {ProjectDetailComponent} from './project-detail/project-detail.component';
import {StartComponent} from './start/start.component';
import {AuthGuard} from '../shared/guards/login.guard';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {GanttComponent} from './gantt/gantt.component';

export const routes: Routes = [

  {title: 'Home - ProjectManager', path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {title: 'Projekt-Liste - ProjectManager', path: 'project-list', component: ProjectListComponent, canActivate: [AuthGuard]},
  {title: 'Projekt-Details - ProjectManager', path: 'projects/:id', component: ProjectDetailComponent, canActivate: [AuthGuard]},
  {title: 'Login - ProjectManager', path: 'login', component: LoginComponent},
  {title: 'Startseite - ProjectManager', path: 'start', component: StartComponent},
  {title: 'Employees - ProjectManager', path: 'employees', component: EmployeeListComponent},
  {title: 'Gantt - ProjectManager', path: 'gantt', component: GanttComponent},
  { path: '**', redirectTo: 'start' },
];

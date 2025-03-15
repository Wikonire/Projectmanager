import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {ProjectListComponent} from './project-list/project-list.component';
import {ProjectDetailComponent} from './project-detail/project-detail.component';
import {StartComponent} from './start/start.component';
import {AuthGuard} from '../shared/guards/login.guard';

export const routes: Routes = [

  {title: 'Home - ProjectManager', path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {title: 'Projekt-Liste - ProjectManager', path: 'project-list', component: ProjectListComponent, canActivate: [AuthGuard]},
  {title: 'Projekt-Details - ProjectManager', path: 'projects/:id', component: ProjectDetailComponent, canActivate: [AuthGuard]},
  {title: 'Login - ProjectManager', path: 'login', component: LoginComponent},
  {title: 'Startseite - ProjectManager', path: 'start', component: StartComponent},
  { path: '**', redirectTo: 'start' },
];

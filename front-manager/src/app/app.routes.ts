import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {ProjectListComponent} from './project-list/project-list.component';
import {ProjectDetailComponent} from './project-detail/project-detail.component';

export const routes: Routes = [

  {title: 'Home - ProjectManager', path: 'home', component: HomeComponent},
  {title: 'Projekt-Liste - ProjectManager', path: 'project-list', component: ProjectListComponent},
  {title: 'Projekt-Details - ProjectManager', path: 'projects/:id', component: ProjectDetailComponent},
  {title: 'Login - ProjectManager', path: 'login', component: LoginComponent},
  { path: '**', redirectTo: 'home' },
];

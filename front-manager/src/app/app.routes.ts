import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ProjectsComponent} from './projects/projects.component';
import {UserAccountComponent} from './user-account/user-account.component';
import {UserManagementComponent} from './user-management/user-management.component';

export const routes: Routes = [
  {title: 'Home - ProjectManager', path: 'home', component: HomeComponent},
  {title: 'Projects - ProjectManager', path: 'project-overview', component: ProjectsComponent},
  {title: 'Account - ProjectManager', path: 'account', component: UserAccountComponent},
  {title: 'User Management - ProjectManager', path: 'user-management', component: UserManagementComponent},
];

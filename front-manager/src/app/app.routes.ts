import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ProjectsComponent} from './projects/projects.component';
import {UserAccountComponent} from './user-account/user-account.component';
import {UserManagementComponent} from './user-management/user-management.component';
import {ProjectDetailComponent} from './project-detail/project-detail.component';
import {DhtmlxGanttComponent} from './dhtmlx-gantt/dhtmlx-gantt.component';
import {HighlightChartComponent} from './highlight-chart/highlight-chart.component';
import {AngularGanttComponent} from './angular-gantt/angular-gantt.component';

export const routes: Routes = [
  {title: 'Home - ProjectManager', path: 'home', component: HomeComponent},
  {title: 'Projects - ProjectManager', path: 'project-overview', component: ProjectsComponent},
  {title: 'Account - ProjectManager', path: 'account', component: UserAccountComponent},
  {title: 'User Management - ProjectManager', path: 'user-management', component: UserManagementComponent},
  {title: 'DhtmlxGantt - ProjectManager', path: 'dhtmlx-gantt', component: DhtmlxGanttComponent},
  {title: 'HighlightChart - ProjectManager', path: 'highlight-gantt', component: HighlightChartComponent},
  {title: 'AngularGantt - ProjectManager', path: 'angular-gantt', component: AngularGanttComponent},
  {title: 'Project-Detail - ProjectManager', path: 'project-detail', component: ProjectDetailComponent},
];

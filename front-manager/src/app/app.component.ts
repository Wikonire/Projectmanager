import {Component, ViewChild} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import {CommonModule, NgForOf, NgOptimizedImage} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {ProjectsComponent} from './projects/projects.component';
import {UserAccountComponent} from './user-account/user-account.component';
import {UserManagementComponent} from './user-management/user-management.component';
import {DhtmlxGanttComponent} from './dhtmlx-gantt/dhtmlx-gantt.component';
import {HighlightChartComponent} from './highlight-chart/highlight-chart.component';
import {AngularGanttComponent} from './angular-gantt/angular-gantt.component';
import {ProjectDetailComponent} from './project-detail/project-detail.component';
import {ProjectsModule} from './projects/projects.module';
import {ProjectDetailModule} from './project-detail/project-detail.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NgForOf,
    RouterOutlet,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    NgOptimizedImage,
    ProjectsModule,
    ProjectDetailModule

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front-manager';
 public links =  [
    {title: 'Home - ProjectManager', path: 'home', component: HomeComponent, icon: 'home'},
    {title: 'Projects - ProjectManager', path: 'project-overview', component: ProjectsComponent, icon: 'view_list'},
    {title: 'Account - ProjectManager', path: 'account', component: UserAccountComponent, icon: 'account_circle'},
    {title: 'User Management - ProjectManager', path: 'user-management', component: UserManagementComponent, icon: 'people'},
    {title: 'DhtmlxGantt - ProjectManager', path: 'dhtmlx-gantt', component: DhtmlxGanttComponent, icon: 'timeline'},
    {title: 'HighlightChart - ProjectManager', path: 'highlight-gantt', component: HighlightChartComponent, icon: 'timeline'},
    {title: 'AngularGantt - ProjectManager', path: 'angular-gantt', component: AngularGanttComponent, icon: 'timeline'},
    {title: 'Project-Detail - ProjectManager', path: 'project-detail', component: ProjectDetailComponent, icon: 'timeline'},
  ];

  @ViewChild(MatMenuTrigger, { static: true }) trigger!: MatMenuTrigger;

  someMethod() {
    this.trigger.openMenu();
  }
}

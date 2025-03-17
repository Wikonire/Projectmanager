import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {CommonModule, NgOptimizedImage, registerLocaleData} from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {HomeModule} from './home/home.module';
import {LoginModule} from './login/login.module';
import {ProjectListModule} from './project-list/project-list.module';
import {ProjectDetailModule} from './project-detail/project-detail.module';
import {AuthService} from '../shared/services/auth.service';
import {StartModule} from './start/start.module';
import {User} from '../shared/interfaces/user.model';
import localeDeCh from '@angular/common/locales/de-CH';
import {MatNativeDateModule} from '@angular/material/core';
import {EmployeeListModule} from './employee-list/employee-list.module';
import {GanttModule} from './gantt/gantt.module';

registerLocaleData(localeDeCh);

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterOutlet, MatMenuModule, MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, NgOptimizedImage, HomeModule, LoginModule, ProjectListModule, ProjectDetailModule, RouterLinkActive, StartModule, MatNativeDateModule, EmployeeListModule, GanttModule],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {

  isLoggedIn: boolean = false;
  private user: User | undefined = undefined;

  constructor(private readonly authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      this.isLoggedIn = this.user != null;
    })
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  onLogout() {
    this.authService.logout();
  }
}

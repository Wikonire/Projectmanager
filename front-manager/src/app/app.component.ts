import {Component, OnInit, ViewChild} from '@angular/core';
import {RouterLink, RouterOutlet, Routes} from '@angular/router';
import {CommonModule, NgForOf, NgOptimizedImage} from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {HomeModule} from './home/home.module';
import {LoginModule} from './login/login.module';
import {ProjectListModule} from './project-list/project-list.module';
import {ProjectDetailModule} from './project-detail/project-detail.module';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    RouterOutlet,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    NgOptimizedImage,
    HomeModule,
    LoginModule,
    ProjectListModule,
    ProjectDetailModule
  ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit{
  public title = 'front-manager';
  sites = [
    {path: 'home', title: 'Home', icon: 'home'},
    {path: 'login', title: 'Login', icon: 'login'},
    {path: 'project-list', title: 'Projekt-Liste', icon: 'lists'},
  ];
  ngOnInit(): void {


  }

}

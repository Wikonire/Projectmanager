import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})
export class StartComponent implements OnInit{
  constructor(private readonly authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.isLoggedIn = user != null;
    })
      this.isLoggedIn = this.authService.isLoggedIn();
  }
  isLoggedIn: boolean = false;

}

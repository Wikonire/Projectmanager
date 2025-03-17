import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {User} from '../../shared/interfaces/user.model';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})
export class StartComponent implements OnInit{
  constructor(private readonly authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe((user:User|undefined) => {
      this.isLoggedIn = user?.id != null;
      console.log(user)
    })
      this.isLoggedIn = this.authService.isLoggedIn();
  }
  isLoggedIn: boolean = false;

}

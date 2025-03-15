import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private readonly authService: AuthService,
              private readonly router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.isLoginValid()) {
      this.authService.login({username: this.loginForm.value.username, password: this.loginForm.value.password}).subscribe(() => {
        this.router.navigate(['/start']);
      });
    }
  }

  isLoginValid(): boolean {
    return this.loginForm.valid && this.loginForm.value.username && this.loginForm.value.password;
  }
}

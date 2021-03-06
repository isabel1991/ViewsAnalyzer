import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorControl } from 'src/app/config/ErrorModule';
import { User } from 'src/app/model/User';
import { UserServiceProvider } from 'src/app/providers/user.provider';
import * as $ from 'jquery';

declare function showMessage(message: string, type: string);


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserServiceProvider]
})
export class LoginComponent implements OnInit {

  public user: User = new User();

  public usernameErrorMessage: string = "";
  public passwordErrorMessage: string = "";
  public loginErrorMessage: string = "";

  constructor(private userProvider: UserServiceProvider, private router: Router) { }

  ngOnInit() {
    if (this.userProvider.userHasLogged())
      this.router.navigate(['/dashboard']);
  }

  validateUser(): void {
    if (!this.user.username) {
      this.usernameErrorMessage = ErrorControl.login.bad_username;
    }
  }

  validatePassword(): void {
    if (!this.user.password) {
      this.passwordErrorMessage = ErrorControl.login.bad_password;
    }
  }

  resetErrorUser(): void {
    this.usernameErrorMessage = "";
  }

  resetErrorPassword(): void {
    this.passwordErrorMessage = "";
  }

  login(): void {
    if (!this.user.isValid()) {
      return;
    }
    $("#btnSubmitLogin").attr('loading', '');
    this.userProvider.login(this.user).subscribe(
      data => {
        sessionStorage.setItem('view-analyzer_user-data', JSON.stringify(data));
        this.loginErrorMessage = "";
        this.router.navigate(['/dashboard']);
      },
      err => {
        this.user.password = "";
        $("#btnSubmitLogin").removeAttr('loading');
        this.loginErrorMessage = ErrorControl.login.login_failed;
      }
    );
  }
}
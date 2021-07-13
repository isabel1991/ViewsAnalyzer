import { Component } from '@angular/core';
import { ErrorControl } from 'src/app/config/ErrorModule';
import { User } from 'src/app/model/User';
import { UserServiceProvider } from 'src/app/providers/user.provider';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public user: User = new User();

  public usernameErrorMessage: string = "";
  public passwordErrorMessage: string = "";
  public loginErrorMessage: string = "";

  constructor(private userProvider: UserServiceProvider) { }

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
    this.userProvider.login(this.user).subscribe(
      data => {
        console.log(data);
        sessionStorage.setItem('user_viewanalyzer',data);
      },
      err => {
        this.loginErrorMessage = ErrorControl.login.login_failed;
      }
    );
  }
}
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { UserServiceProvider } from 'src/app/providers/user.provider';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [UserServiceProvider]
})
export class DashboardComponent implements OnInit {
  public userLogged:User;

  constructor(private userProvider: UserServiceProvider) { }

  ngOnInit(): void {

    if(this.userProvider.userHasLogged()) {
      this.userLogged = this.userProvider.getUserLogged();      
    }
  }

}

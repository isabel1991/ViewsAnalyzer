import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { UserServiceProvider } from 'src/app/providers/user.provider';
declare function showHideUserConfig();
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers:[UserServiceProvider]
})
export class HeaderComponent implements OnInit {

  public currentUserLogged:User;

  constructor(private userProvider:UserServiceProvider) { }

  ngOnInit(): void {
    
    if(this.userProvider.userHasLogged()) {
      this.currentUserLogged = this.userProvider.getUserLogged();
    }
  }

  openUserConfig():void {
    showHideUserConfig();
  }

  logout():void {
    this.userProvider.logout(true);
  }
}

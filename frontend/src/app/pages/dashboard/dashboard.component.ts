import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { UserServiceProvider } from 'src/app/providers/user.provider';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [UserServiceProvider]
})
export class DashboardComponent implements OnInit {
  public userLogged: User;

  constructor(private userProvider: UserServiceProvider, private router: Router) { }

  ngOnInit(): void {

    if (this.userProvider.userHasLogged()) {
      this.userLogged = this.userProvider.getUserLogged();
    }
  }

  panelAction(id: number) {
    switch (id) {
      case 0:
        this.router.navigate(['/view-builder']);
        break;
      case 1:
        alert("Not implemented yet!")
        // this.router.navigate(['/database-viewer']);
        break;
        case 2:
        alert("Not implemented yet!")
        // this.router.navigate(['/user-management']);
        break;
    }
  }
}

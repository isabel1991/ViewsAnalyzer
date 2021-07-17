import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceProvider } from '../providers/user.provider';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  providers: [UserServiceProvider]
})
export class PagesComponent implements OnInit {

  constructor(private userProvider: UserServiceProvider, private router: Router) { }

  ngOnInit(): void {
    
    if (!this.userProvider.userHasLogged()) {
      this.router.navigate(['/login']);
    }
  }

}

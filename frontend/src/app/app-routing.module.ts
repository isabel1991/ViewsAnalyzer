import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthRoutingModule } from './auth/auth-routing.module';
import { PagesRoutingModule } from './pages/pages-routing.module';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '**',redirectTo: 'page-not-found'},
  { path: 'page-not-found', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule,
    PagesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

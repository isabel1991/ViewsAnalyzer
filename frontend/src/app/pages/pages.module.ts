import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { PagesRoutingModule } from './pages-routing.module';
import { MessagesComponent } from './messages/messages.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { TempComponent } from './temp/temp.component';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    MessagesComponent,
    ProfileComponent,
    SettingsComponent,
    TempComponent
  ],
  exports: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    SharedModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }

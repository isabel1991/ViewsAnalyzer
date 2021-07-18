import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { PagesRoutingModule } from './pages-routing.module';

import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';
import { UserManagementComponent } from './user-management/user-management.component';
import { ViewManagementComponent } from './view-management/view-management.component';
import { DatabaseViewerComponent } from './database-viewer/database-viewer.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    UserManagementComponent,
    ViewManagementComponent,
    DatabaseViewerComponent
  ],
  exports: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ComponentsModule,
    SharedModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }

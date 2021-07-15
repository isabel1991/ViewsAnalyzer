import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DatabaseViewerComponent } from './database-viewer/database-viewer.component';
import { PagesComponent } from './pages.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ViewManagementComponent } from './view-management/view-management.component';

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent, data: {} },
            { path: 'view-builder', component: ViewManagementComponent, data: {} },
            { path: 'database-viewer', component: DatabaseViewerComponent, data: {} },
            { path: 'user-management', component: UserManagementComponent, data: {} },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }

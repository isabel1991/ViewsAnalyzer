import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessagesComponent } from './messages/messages.component';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { TempComponent } from './temp/temp.component';

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent, data: {} },
            { path: 'profile', component: ProfileComponent, data: {} },
            { path: 'messages', component: MessagesComponent, data: {} },
            { path: 'settings', component: SettingsComponent, data: {} },


            { path: 'temporal', component: TempComponent, data: {} },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }

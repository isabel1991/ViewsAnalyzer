import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full'},
            { path: 'login', component: LoginComponent, data: {} },
            { path: 'registry', component: RegisterComponent, data: {} }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }

import { Injectable, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../model/User";
import { UserService } from "../services/user.service";

@Injectable({
    providedIn: 'root'
})

export class UserServiceProvider {
    private singleListener: EventEmitter<User> = new EventEmitter();
    private multipleListener: EventEmitter<User> = new EventEmitter();

    constructor(private userService: UserService, private router: Router) { }

    login(user: User): EventEmitter<any> {
        const params = {
            "username": user.username,
            "password": user.password
        }
        this.userService.login(params).subscribe(
            data => this.singleListener.emit(data),
            err => this.singleListener.error(err)
        );
        return this.singleListener;
    }

    logout(redirectToLogin: boolean = false): void {
        sessionStorage.removeItem("view-analyzer_user-data");

        if (redirectToLogin) {
            this.router.navigate(['/login']);
        }
    }

    userHasLogged(): boolean {
        let user: User = User.parse(JSON.parse(sessionStorage.getItem("view-analyzer_user-data")));
        return user != null;
    }

    getUserLogged(): User {
        return User.parse(JSON.parse(sessionStorage.getItem("view-analyzer_user-data")));
    }

    register(): EventEmitter<any> {

        return this.singleListener;
    }

    update(): EventEmitter<any> {

        return this.singleListener;
    }

    upgradeStatus(): EventEmitter<any> {

        return this.singleListener;
    }
}
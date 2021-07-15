import { Injectable, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../model/User";
import { UserService } from "../services/user.service";

@Injectable({
    providedIn: 'root'
})

export class UserServiceProvider {

    constructor(private userService: UserService, private router: Router) { }

    login(user: User): EventEmitter<any> {
        const params = {
            "username": user.username,
            "password": user.password
        }

        const listener: EventEmitter<User> = new EventEmitter();

        this.userService.login(params).subscribe(
            data => {                
                listener.emit(data)
            },
            err => {
                listener.error(err);
            }
        );
        return listener;
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
        const listener: EventEmitter<User> = new EventEmitter();
        return listener;
    }

    update(): EventEmitter<any> {
        const listener: EventEmitter<User> = new EventEmitter();
        return listener;
    }

    upgradeStatus(): EventEmitter<any> {
        const listener: EventEmitter<User> = new EventEmitter();
        return listener;
    }
}
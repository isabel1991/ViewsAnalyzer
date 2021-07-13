import { Injectable, EventEmitter } from "@angular/core";
import { User } from "../model/User";
import { UserService } from "../services/user.service";

@Injectable({
    providedIn: 'root'
})

export class UserServiceProvider {
    private singleListener: EventEmitter<User> = new EventEmitter();
    private multipleListener: EventEmitter<User> = new EventEmitter();

    constructor(private userService: UserService) { }

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
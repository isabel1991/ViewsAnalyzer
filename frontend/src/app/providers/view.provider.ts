import { EventEmitter, Injectable } from "@angular/core";

import { View } from "../model/View";
import { ViewService } from "../services/view.service";
import { SessionProvider } from "./session.provider";
import { UserServiceProvider } from "./user.provider";

@Injectable({
    providedIn: 'root'
})

export class ViewServiceProvider {

    constructor(private userProvider: UserServiceProvider, private viewService: ViewService) {

    }

    getAllViews(): EventEmitter<View[]> {
        const listener: EventEmitter<View[]> = new EventEmitter();

        this.viewService.getAllViews().subscribe(
            views => {
                listener.emit(views)
            },
            error => listener.error(error)
        )

        return listener;
    }

    createView(view: View): EventEmitter<boolean> {
        const listener: EventEmitter<boolean> = new EventEmitter();

        const newView = {
            name: view.name,
            description: view.description,
            usingFiltroMayores: view.usingFiltroMayores ? 1 : 0,
            creationDate: Date.now(),
            userId: this.userProvider.getUserLogged().id,
            stateId: 1
        }

        console.log(newView);

        this.viewService.createView(newView).subscribe(
            data => {
                listener.emit(true);
            },
            error => listener.error(error)
        )

        return listener;
    }

    removeView(view: View): EventEmitter<boolean> {
        const listener: EventEmitter<boolean> = new EventEmitter();

        this.viewService.removeView({'id':view.id}).subscribe(
            data => {
                listener.emit(true);
            },
            error => listener.error(error)
        )

        return listener;
    }
}
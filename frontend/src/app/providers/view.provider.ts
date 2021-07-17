import { EventEmitter, Injectable } from "@angular/core";

import { View } from "../model/View";
import { ViewService } from "../services/view.service";

@Injectable({
    providedIn: 'root'
})

export class ViewServiceProvider {

    constructor(private viewService:ViewService) {

    }

    getAllViews():EventEmitter<View> {
        const listener: EventEmitter<View> = new EventEmitter();

        this.viewService.getAllViews().subscribe(
            views => {
                let viewList:View[];
                listener.emit(viewList)
            },
            error=>listener.error(error)
        )

        return listener;
    }
}
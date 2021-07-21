import { EventEmitter } from "@angular/core";
import { Tablelable } from "../Tablelable.interface";
import { Utils } from "./Utils";

export class Stream {
    private importListListener:EventEmitter<Tablelable[]> = new EventEmitter();
    private importSingleListener:EventEmitter<Tablelable[]> = new EventEmitter();
    private exportListListener:EventEmitter<Tablelable[]> = new EventEmitter();
    private exportSingleListener:EventEmitter<Tablelable[]> = new EventEmitter();

    openImports() {
        const listener = new EventEmitter<Tablelable>();
        this.importListListener.subscribe(
            data => {
                listener.emit(data);
            },
            err=> {
                listener.error(err);
            }
        );
        this.importSingleListener.subscribe(
            data => {
                listener.emit(data);
            },
            err=> {
                listener.error(err);
            }
        );

        return listener;
    }
    openExports() {
        const listener = new EventEmitter<Tablelable>();
        this.exportListListener.subscribe(
            data => {
                listener.emit(data);
            },
            err=> {
                listener.error(err);
            }
        );
        this.exportSingleListener.subscribe(
            data => {
                listener.emit(data);
            },
            err=> {
                listener.error(err);
            }
        );

        return listener;
    }

    imports(element:any, isAList:boolean = false) {
        if(Utils.isList(element)) {
            this.importListListener.emit(element);
        }
        else {
            this.importSingleListener.emit(element);
        }
    }
    exports(element:any, isAList:boolean = false) {
        if(Utils.isList(element)) {
            this.exportListListener.emit(element);
        }
        else {
            this.exportSingleListener.emit(element);
        }
    }
}
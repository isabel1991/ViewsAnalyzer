import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class SessionProvider {

    set(key:string,content:any) {
        sessionStorage.setItem(key,content);
    }

    get(key:string) {
        return sessionStorage.getItem(key);
    }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServerConfig } from '../config/server-config';

@Injectable({
    providedIn: 'root'
})
export class HeaderConfigurationService {
    protected header: HttpHeaders = new HttpHeaders();

    constructor() {
        this.header.set('Access-Control-Allow-Origin', '*');
        this.header.set('content-type', 'application/json');
        this.header.set('user-agent', navigator.userAgent.toString());
        this.header.set('accept', '*/*');
        this.header.set('connection', 'keep-alive');
    }
}
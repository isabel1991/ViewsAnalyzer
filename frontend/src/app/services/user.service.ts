import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServerConfig } from '../config/server-config';
import { HeaderConfigurationService } from './Service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends HeaderConfigurationService{
  
  constructor(private httpClient: HttpClient) {
    super();
  }

  login(parameters: any): Observable<any> {    
    return this.httpClient.post(ServerConfig.server_ip+"/api/user/login",parameters,{headers: this.header});
  }
}
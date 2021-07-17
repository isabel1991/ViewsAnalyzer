import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerConfig } from '../config/server-config';
import { HeaderConfigurationService } from './Service';

@Injectable({
  providedIn: 'root'
})
export class ViewService extends HeaderConfigurationService{
  
  constructor(private httpClient: HttpClient) {
    super();
  }

  getAllViews():Observable<any> {

    return this.httpClient.get(ServerConfig.server_ip+"/api/view/getAll",{headers: this.header});
  }
}

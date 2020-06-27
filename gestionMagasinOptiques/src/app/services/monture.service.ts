import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Monture } from '../model/monture';

@Injectable({
  providedIn: 'root'
})
export class MontureService {

  constructor(private httpclient: HttpClient) { }

    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Access-Control-Allow-Origin':'*',
        })
    };

    store(monture: Monture): Observable<any> 
    {
        return this.httpclient.post(`${environment.apiUrl}/montures/create`, monture,this.httpOptions);
    }

    
}

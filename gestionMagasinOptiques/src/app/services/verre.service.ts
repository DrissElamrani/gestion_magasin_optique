import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Verre } from '../model/verre';

@Injectable({
  providedIn: 'root'
})
export class VerreService {

  constructor(private httpclient: HttpClient) { }

    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Access-Control-Allow-Origin':'*',
        })
    };

    store(verre: Verre): Observable<any> 
    {
        return this.httpclient.post(`${environment.apiUrl}/verres/create`, verre,this.httpOptions);
    }

    
}

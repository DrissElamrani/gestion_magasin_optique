import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LunetteSolaire } from '../model/lunetteSolaire';

@Injectable({
  providedIn: 'root'
})
export class LunetteSolaireService {

  constructor(private httpclient: HttpClient) { }

    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Access-Control-Allow-Origin':'*',
        })
    };

    store(lunetteSolaire: LunetteSolaire): Observable<any> 
    {
        return this.httpclient.post(`${environment.apiUrl}/lunettesolaires/create`, lunetteSolaire,this.httpOptions);
    }

    
}

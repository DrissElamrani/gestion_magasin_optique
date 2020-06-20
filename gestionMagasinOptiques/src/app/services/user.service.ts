import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpclient: HttpClient) { }

    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Access-Control-Allow-Origin':'*',
        })
    };

    getUsers(): Observable<any> {
      return this.httpclient.get(`${environment.apiUrl}/Users/list`);
     }

     addUser(user: User): Observable<any> 
    {
        return this.httpclient.post(`${environment.apiUrl}/Users`, user,this.httpOptions);
    }

    getUserById(id:number):Observable<any> {
      return this.httpclient.get(`${environment.apiUrl}/Users/${id}`,this.httpOptions)
    }

    modifierUser(user : User, id: number): Observable<any> {
      return this.httpclient.put(`${environment.apiUrl}/Users/${id}`, user,this.httpOptions);
    }

    supprimerUser(id: number): Observable<any> {
      return this.httpclient.delete(`${environment.apiUrl}/Users/${id}`,this.httpOptions);
  }
}

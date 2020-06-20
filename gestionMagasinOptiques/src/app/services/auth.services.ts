import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { HttpClientModule, HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class Authservices {

  private userSubject: BehaviorSubject<User>;
  public userLogged: Observable<User>;

  private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin':'*',
      })
  };
  
  constructor(private router: Router, private httpclient: HttpClient) {
      this.userSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
      this.userLogged = this.userSubject.asObservable();
  }

  public get currentUser(): User {
    //console.log(this.userSubject.value);
    return this.userSubject.value;
  }


  signIn(login:string,motdepasse:string){
    return this.httpclient.post<any>(`${environment.apiUrl}/user/auth`,{login,motdepasse},this.httpOptions)
     .pipe(map(user=>{
            sessionStorage.setItem('currentUser',JSON.stringify(user));
            this.userSubject.next(user);
            return user;
     }));
  }

  signOut() {
    sessionStorage.removeItem('currentUser');
    this.userSubject.next(null);
  }

}

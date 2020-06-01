import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
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
  
  constructor(private router: Router, private httpclient: HttpClient) {
      this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.userLogged = this.userSubject.asObservable();
  }

  public get currentUser(): User {
    //console.log(this.userSubject.value);
    return this.userSubject.value;
  }


<<<<<<< HEAD
  signIn(login: string, password: string): Observable<any> {
    return this.httpclient.get("http://localhost:8090/gestionMagasinOptique/optique/Users/" + login + "/" + password + "",{ observe: 'response' })
    .pipe(catchError(this.handleError));
  }

  getuser(login: string, password: string): Observable<any> {
    return this.httpclient.get("http://localhost:8090/gestionMagasinOptique/optique/Users/" + login + "/" + password + "")
    
  }
=======
  signIn(login:string,motdepasse:string){
    return this.httpclient.post<any>(`${environment.apiUrl}/user/auth`,{login,motdepasse})
     .pipe(map(user=>{
            localStorage.setItem('currentUser',JSON.stringify(user));
            this.userSubject.next(user);
            return user;
     }));
  }

>>>>>>> 9785a216e3aee4a3f4244c6124964486a8a7eed1
  signOut() {
    localStorage.removeItem('currentUser');
    this.userSubject.next(null);
  }

}

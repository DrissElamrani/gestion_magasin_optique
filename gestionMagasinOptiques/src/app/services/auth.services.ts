import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class Authservices {

  private Auth = new BehaviorSubject<boolean>(false);
  private userLogged = new BehaviorSubject<Number>(0);
  private login = 'driss';
  private password = '123';

  constructor(private router: Router, private httpclient: HttpClient) { }

  get isLoggedIn() {
    return this.Auth.asObservable(); // {2}
  }
  get Userlogged() {
    return this.userLogged.asObservable(); // {2}
  }

  isLogged()
  {
     this.Auth.next(true);
     this.router.navigate(['/home']);
  }
 userAuth(user:Number)
 {
  this.userLogged.next(user);
 }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = ` ${error.status}`;
    }
    //window.alert(errorMessage);
    return throwError(errorMessage);
  }

  signIn(login: string, password: string): Observable<any> {
    return this.httpclient.get("http://localhost:8090/optique/Users/" + login + "/" + password + "",{ observe: 'response' })
    .pipe(catchError(this.handleError));
  }

  getuser(login: string, password: string): Observable<any> {
    return this.httpclient.get("http://localhost:8090/optique/Users/" + login + "/" + password + "")
    
  }
  signOut() {
    this.router.navigate(['/auth']);
    this.Auth.next(false);
  }
}
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class Authservices
{
    private Auth = new BehaviorSubject<boolean>(false);

    private login='driss';
    private password='123';

    constructor(private router:Router){}

    get isLoggedIn() {
      return this.Auth.asObservable(); // {2}
    }

    signIn(login:string,password:string) {
      if(this.login === login && this.password === password){
          this.Auth.next(true);
          this.router.navigate(['/home']);
      }
     // return this.isAuth;
    }
  
    signOut() {
      this.Auth.next(false);
      this.router.navigate(['/home']);
    }
}
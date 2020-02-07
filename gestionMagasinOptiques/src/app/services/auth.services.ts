import { promise } from 'protractor';
import { resolve } from 'url';

export class Authservices
{
    isAuth = false;
    login='driss';
    password='123';

     signIn(login:string,password:string) {
      if(this.login===login && this.password===password){
      this.isAuth=true;
      }
      return this.isAuth;
    }
  
    signOut() {
      this.isAuth = false;
    }
}
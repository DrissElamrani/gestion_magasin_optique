import { promise } from 'protractor';
import { resolve } from 'url';

export class Authservices
{
    isAuth = false;
    login='driss';
    password='123';

    signIn() {
      return new Promise(
        (resolve, reject) => {
          setTimeout(
            () => {
              this.isAuth = true;
              resolve(true);
            }, 1000
          );
        }
      );
    }
  
    signOut() {
      this.isAuth = false;
    }
}
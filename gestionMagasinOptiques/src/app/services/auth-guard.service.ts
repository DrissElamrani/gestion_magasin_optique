import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Authservices } from './auth.services';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: Authservices,
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

      const userLogged = this.authService.currentUser;

      if(userLogged != null){
        return true;
      }
      
      return this.router.navigate['/auth'];
    
  }

}
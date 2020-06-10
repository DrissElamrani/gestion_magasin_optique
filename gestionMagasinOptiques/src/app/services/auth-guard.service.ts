import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Authservices } from './auth.services';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private authService: Authservices,
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

      const userLogged = this.authService.currentUser;

      if(userLogged){
        return true;
      }
    
      this.router.navigate(['/auth']);
      return false;
    
  }

}
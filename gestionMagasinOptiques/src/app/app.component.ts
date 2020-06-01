import { Component } from '@angular/core';
import {Observable} from 'rxjs/observable';
import 'rxjs/Rx';
import {Router} from "@angular/router";
import { Authservices } from './services/auth.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  userLogged: any;


  constructor( private authService:Authservices,private router:Router){
     this.authService.userLogged.subscribe(x=>this.userLogged = x);
  }
  
  ngOnInit(){
    
  }

  logout(){
    this.authService.signOut;
    this.router.navigate(['/auth']);
  }

}




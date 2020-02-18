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

  
  isLoggedIn:Observable<boolean>;

  constructor( private authService:Authservices){}
  
  ngOnInit(){
    this.isLoggedIn = this.authService.isLoggedIn;
  }

}




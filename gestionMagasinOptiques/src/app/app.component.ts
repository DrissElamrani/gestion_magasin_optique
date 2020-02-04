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
  secondes :number;
  constructor( private authService:Authservices,private router: Router){}
  ngOnInit(){
    const counter=Observable.interval(1000);
    counter.subscribe(
      (value:number)=>{
        if(this.secondes===10)
        {
          if(confirm('êtes-vous sûr de vouloir de rester conecter?')) 
          {
            value=0;
            this.secondes=value;          
          }else
            this.authService.signOut();
            this.router.navigate(['auth']);
            this.secondes=0;
            value=0;
        }else
        this.secondes=value;
        
      },
      (error:any)=>{
        console.log('une erreur a été rencontrée');
      },
      ()=>{
        console.log('observable completée');
      }
      
    );
  
  }
}




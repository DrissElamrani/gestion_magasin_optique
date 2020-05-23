import { Component,Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Authservices } from '../services/auth.services';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { AppComponent } from '../app.component';
import { User } from '../model/user';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})

export class AuthentificationComponent implements OnInit {
  user:User;
  @Input() login: string='';
  @Input() password: string='';
  @Input() erreur_connexion: string='';
  @Input() btn_active_login: boolean=false;
  @Input() btn_active_password: boolean=false;

  authStatus : Observable<boolean>;

  dateNow : Date=new Date();

  constructor(private authService:Authservices, private router: Router) { }

  ngOnInit() {
    this.authStatus = this.authService.isLoggedIn;
  }

  onSignIn(form:NgForm) {
    const login= form.value['login'];
    const password= form.value['password'];
    //this.authService.signIn(login,password);
    var statut=0;
    this.authService.signIn(login,password).subscribe(
     data=>{
       console.log(data.status);
        statut=data.status;
       if(statut==200)
       {
        this.authService.isLogged();
        this.authService.getuser(login,password).subscribe(
          datauser=>{
            this.user = datauser;
            this.authService.userAuth(this.user.idUser);
            alert(this.user.idUser);
          }
        );
        
        
       }
       
     }

    );
  }

  

  /*getColorlogin()
  {
    if(this.authStatus)
    return 'green';
    else
    return 'red';
  }

  getColorpassword(){
    if(this.btn_active_password)
    return 'red';
    else
    return 'green';
  }*/
  
}

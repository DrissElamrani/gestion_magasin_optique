import { Component,Input, OnInit, Output } from '@angular/core';
import { Authservices } from '../services/auth.services';
import {Router} from "@angular/router";
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {
  @Input() login: string='';
  @Input() password: string='';
  @Input() erreur_connexion: string='';
  @Input() btn_active_login: boolean=false;
  @Input() btn_active_password: boolean=false;
  authStatus: boolean;
  dateNow:Date=new Date();
  constructor(private authService:Authservices, private router: Router) { }
  ngOnInit() {
    this.authStatus = this.authService.isAuth;
  }

  onSignIn(from:NgForm) {
    const login=from.value['login'];
    const password=from.value['password']
    this.authStatus =this.authService.signIn(login,password)

        if(this.authStatus){           
        this.router.navigate(['client']);
        }else
        {
          this.erreur_connexion='login ou mot de passe incorrect';  
        }
  }

  onSignOut() {
    if(confirm('êtes-vous sûr de vouloir vous déconnecter?')) {
    this.authService.signOut();
    this.authStatus = this.authService.isAuth;
    }
  }
  getColorlogin()
  {
    if(this.authStatus)
    return 'green';
    else
    return 'red';
  }
    getColorpassword()
    {
    if(this.btn_active_password)
    return 'red';
    else
    return 'green';
  }
  
}

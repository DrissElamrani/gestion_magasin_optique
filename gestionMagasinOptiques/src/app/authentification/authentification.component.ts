import { Component,Input, OnInit } from '@angular/core';
import { Authservices } from '../services/auth.services';
import {Router} from "@angular/router";

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

  constructor(private authService:Authservices, private router: Router) { }

  ngOnInit() {
    this.authStatus = this.authService.isAuth;
  }

  onSignIn() {
    this.authService.signIn().then(
      () => {
        if(this.login===this.authService.login && this.password===this.authService.password){
        this.authStatus = this.authService.isAuth;
        this.router.navigate(['']);
        }else if(this.login===''||this.password==="")
        {
          if(this.password==="")
          {
          this.btn_active_password=true;
          this.erreur_connexion='';
          this.erreur_connexion='merci de saisie votre mot de passe';  
          } 
          if(this.login==='')
          {
        this.btn_active_login=true;
        this.erreur_connexion='';
        this.erreur_connexion='merci de saisie votre login';
          }
        }else
        {
          this.erreur_connexion='';
          this.erreur_connexion='login ou mot de passe incorrect';  
        }
      }
    );
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

import { Component,Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Authservices } from '../services/auth.services';
import { Router } from '@angular/router';
import { NgForm,FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';
import { User } from '../model/user';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})

export class AuthentificationComponent implements OnInit {
  user: User;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error: any;

  constructor(private authService: Authservices, private router: Router
    ,private formBuilder: FormBuilder) 
    {
      // redirect to home if already logged in
       if(this.authService.currentUser != null){
          this.router.navigate(['/home']);
       }
    }

  ngOnInit() {
          this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            pass: ['', Validators.required]
        });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  

  onSignIn() {
      this.submitted = true;

      if(this.loginForm.invalid){
         return;
      }

      this.loading = true;

      this.authService.signIn(this.f.username.value,this.f.pass.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/home']);
        },
        err => {
          if(err.status == 404) this.error = "Login ou mot de passe invalide";
          else this.error = "something went wrong please try again";
  
          console.log(err);
          this.loading = false;
        }
      );
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  loading = false;

  constructor(private userService: UserService,private formBuilder:FormBuilder) { }

  newUserBuilder : FormGroup = this.formBuilder.group({
    nom: ['',[Validators.required]],
    prenom: ['',[Validators.required]],
    login: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*'), Validators.minLength(6), Validators.maxLength(30)]],
    addresse: ['',[Validators.maxLength(255)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.email]],
    telephone: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)]],
  });

  ngOnInit() {
  }

  field(feildName:string){
    return this.newUserBuilder.get(feildName);
  }

  createHandler(){
    this.loading = true;
    let values = this.newUserBuilder.value;
    let user : User = {
      nom: values.nom,
      prenom: values.prenom,
      login: values.login,
      addresse: values.addresse,
      motdepasse: values.password,
      email: values.email,
      tel: values.telephone,
    }
    this.userService.addUser(user).subscribe(
      next => {
        Swal.fire(
          'Good job!',
          'Nouveau utlisateur à été bien enregistré',
          'success'
        );
        this.newUserBuilder.reset();
      },
      error => {
        console.log(error);
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
   
}

}

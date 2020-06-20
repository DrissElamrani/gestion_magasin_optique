import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: User;
  paramId : number;
  loading = false;
  fieldTextType: boolean;

  constructor(
    private userService:UserService,
    private formBuilder:FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

    editUserBuilder : FormGroup = this.formBuilder.group({
      idUser: [''],
      nom: ['',[Validators.required]],
      prenom: ['',[Validators.required]],
      login: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*'), Validators.minLength(6), Validators.maxLength(30)]],
      addresse: ['',[Validators.maxLength(255)]],
      motdepasse: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.email]],
      tel: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)]],
      dateCreation: [''],
      datemodification: [''],
    });

    ngOnInit() {
      this.paramId = parseInt(this.route.snapshot.paramMap.get("id"));
      this.getUser();
  }


  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  getUser(){
    this.userService.getUserById(this.paramId).subscribe(
      (data) => {
          this.user = data;
          this.editUserBuilder.setValue(this.user);
      },
      error => {
        console.log(error);
      }
    );
  }

  field(feildName:string){
    return this.editUserBuilder.get(feildName);
  
  }

  editHandler(){
    this.loading = true;
    let values = this.editUserBuilder.value;
    let user : User = {
      nom: values.nom,
      prenom: values.prenom,
      login: values.login,
      addresse: values.addresse,
      motdepasse: values.motdepasse,
      email: values.email,
      tel: values.tel,
    }
    this.userService.modifierUser(user,parseInt(this.field('idUser').value)).subscribe(
      next => {
        Swal.fire(
          'Good job!',
          'les changements à été bien enregistré',
          'success'
        );
        this.loading = false;
      },
      error => {
        Swal.fire(
          'Oops!',
          'quelque chose a mal tourné',
          'error'
        );
        console.log(error);
        this.loading = false;
      }
    );
  }

}

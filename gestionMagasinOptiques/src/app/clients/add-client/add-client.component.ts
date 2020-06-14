import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/model/client';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  loading = false;

  constructor(private clientService: ClientService,private formBuilder:FormBuilder) { }

  newClientBuilder : FormGroup = this.formBuilder.group({
    nom: ['',[Validators.required]],
    prenom: ['',[Validators.required]],
    numero: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*'), Validators.minLength(6), Validators.maxLength(15)]],
    addresse: ['',[Validators.maxLength(255)]],
    mutuelle: ['', [Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(15)]],
    remarque: ['',[Validators.maxLength(255)]],
    email: ['', [Validators.email]],
    telephone: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)]],
  });

  ngOnInit() {
  }

  field(feildName:string){
    return this.newClientBuilder.get(feildName);
  }

  createHandler(){
    this.loading = true;
    let values = this.newClientBuilder.value;
    let client : Client = {
      nom: values.nom,
      prenom: values.prenom,
      numero: values.numero,
      addresse: values.addresse,
      mutuelle: values.mutuelle,
      remarque: values.remarque,
      email: values.email,
      telephone: values.telephone,
    }
    this.clientService.addClient(client).subscribe(
      next => {
        Swal.fire(
          'Good job!',
          'Nouveau client à été bien enregistré',
          'success'
        );
        this.newClientBuilder.reset();
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

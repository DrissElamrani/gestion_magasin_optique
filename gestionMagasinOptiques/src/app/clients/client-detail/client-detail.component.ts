import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/model/client';
import { ClientService } from 'src/app/services/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {

  client: Client;
  paramId : number;
  loading = false;

  constructor(
    private clientService:ClientService,
    private formBuilder:FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  editClientBuilder : FormGroup = this.formBuilder.group({
    idClt: [''],
    nom: ['',[Validators.required]],
    prenom: ['',[Validators.required]],
    numero: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*'), Validators.minLength(6), Validators.maxLength(15)]],
    addresse: ['',[Validators.maxLength(255)]],
    mutuelle: ['', [Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(15)]],
    remarque: ['',[Validators.maxLength(255)]],
    email: ['', [Validators.email]],
    telephone: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)]],
    dateCreation: [''],
    dateModification: [''],
  });

  ngOnInit() {
      this.paramId = parseInt(this.route.snapshot.paramMap.get("id"));
      this.getClient();
  }

  getClient(){
    this.clientService.getClientById(this.paramId).subscribe(
      (data) => {
          this.client = data;
          this.editClientBuilder.setValue(this.client);
      },
      error => {
        console.log(error);
      }
    );
  }

  field(feildName:string){
    return this.editClientBuilder.get(feildName);
  
  }
 

  editHandler(){
    this.loading = true;
    let values = this.editClientBuilder.value;
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
    this.clientService.modifierClient(client,parseInt(this.field('idClt').value)).subscribe(
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

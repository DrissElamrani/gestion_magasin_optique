import { Component, OnInit, Input } from '@angular/core';
import { ClientsSrvices } from '../services/client.service';
import{FormBuilder} from '@angular/forms';
import {Validators} from '@angular/forms';
import {Router} from "@angular/router";
@Component({
  selector: 'app-ajouter-client',
  templateUrl: './ajouter-client.component.html',
  styleUrls: ['./ajouter-client.component.css']
})
export class AjouterClientComponent implements OnInit {
  clients: any[];
  clients1: any[];
  @Input() id:number;
  @Input() name:string;
  @Input() prenom:string;
  @Input() ville:string;
  @Input() email:string;
  @Input() sexe:string;
  @Input() cin:string;
  @Input() addresse:string;
  @Input() numeroTel:string;

  constructor(private fb :FormBuilder,private Clientservice : ClientsSrvices,private router: Router) {}
  clientForm=this.fb.group({
  idF :[''],
  nameF:['',Validators.required],
  prenomF :['',Validators.required],
  villeF:[''],
  emailF :['',Validators.required],
  sexeF:[''],
  cinF:[''],
  addresseF:[''],
  numeroTelF:['']
  });
  enregestrerClientTS(){
    var  clientExist :Number=0;

    var varid=this.clientForm.get('idF').value;
    if(varid!=0 && varid!=null){
    clientExist=this.Clientservice.rechercherClientById(+varid).id;
     }
    if(clientExist===0 || clientExist===null){
    var varname=this.clientForm.get('nameF').value;
    var varprenomF=this.clientForm.get('prenomF').value;
    var varvilleF=this.clientForm.get('villeF').value;
    var varemailF=this.clientForm.get('emailF').value;
    var varsexeF=this.clientForm.get('sexeF').value;
    var varcinF=this.clientForm.get('cinF').value;
    var varaddresseF=this.clientForm.get('addresseF').value;
    var varnumeroTelF=this.clientForm.get('numeroTelF').value;
    this.Clientservice.enregestrerClient(varname,varprenomF,varvilleF,varemailF,varsexeF,varcinF,varaddresseF,varnumeroTelF);
    this.clientForm.reset();
    this.router.navigate(['client']);
  }
  else
  this.clientForm.reset();

  }
rechercherClientByIdTS(idd  :number)
{
   this.id=this.Clientservice.rechercherClientById(+idd).id;
   this.name=this.Clientservice.rechercherClientById(+idd).name;
   this.prenom=this.Clientservice.rechercherClientById(+idd).prenom;
   this.ville=this.Clientservice.rechercherClientById(+idd).ville;
   this.email=this.Clientservice.rechercherClientById(+idd).email;
   this.sexe=this.Clientservice.rechercherClientById(+idd).sexe;  
   this.cin=this.Clientservice.rechercherClientById(+idd).cin;  
   this.addresse=this.Clientservice.rechercherClientById(+idd).addresse;  
   this.numeroTel=this.Clientservice.rechercherClientById(+idd).numeroTel;
} 
supprimerclientTS(i :number){
  if(confirm('êtes-vous sûr de vouloir vous supprimer ce client??')) {
  this.Clientservice.supprimerClient(i);
  this.clientForm.reset();
  this.router.navigate(['client']);
  }
}

  ngOnInit() {
    this.clients1=this.Clientservice.clientss;
    if(this.clients1!=null){
    this.clients=this.clients1;
    }
  }

}

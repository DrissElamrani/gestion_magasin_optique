import { Component, OnInit, Input, ɵConsole } from '@angular/core';
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
  oeil_lentille:boolean=false;
  activeLunette:boolean=false;
  activeLentille:boolean=false;
  @Input() Prix_D:number=0;
  @Input() Prix_G:number=0;
  @Input() PrixMont:number=0;
  @Input() PrixTotal:number=0;

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
  lentilleOeilForm=this.fb.group({
    typeCorF:['',Validators.required],
    idF:['',Validators.required],

    sphF_G :[''],
    cylF_G:[''],
    axeF_G :[''],
    V_LoinF_G:[''],
    V_presF_G :[''],
    natureF_G:[''],
    PrixF_G:[''],
    sphF_D :[''],
    cylF_D:[''],
    axeF_D :[''],
    V_LoinF_D:[''],
    V_presF_D :[''],
    natureF_D:[''],
    PrixF_D:[''],
    typeMontureF:[''],
    QuntMontF:[''],
    PrixMontF:[''],
    VersementF:[''],
    PrixTotalF:[''],
    RestF:[''],

    sphF_L_G :[''],
    cylF_L_G:[''],
    axeF_L_G :[''],
    V_LoinF_L_G:[''],
    V_presF_L_G :[''],
    natureF_L_G:[''],
    PrixF_L_G:[''],
    sphF_L_D :[''],
    cylF_L_D:[''],
    axeF_L_D :[''],
    V_LoinF_L_D:[''],
    V_presF_L_D :[''],
    natureF_L_D:[''],
    PrixF_L_D:['']
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
    if(confirm("Voulez vous choisir une l'Oein ou lentille ??")) {
      this.oeil_lentille=true;
      }
      else{
    this.clientForm.reset();
      }
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
  }
}

  ngOnInit() {
    /*this.clients1=this.Clientservice.clientss;
    if(this.clients1!=null){
    this.clients=this.clients1;
    }*/
    this.clients=this.Clientservice.clientss;
  }
  ajouterOeilLentille()
  {
    var varid=this.clientForm.get('idF').value;
    if(varid!=null)
    {
    this.oeil_lentille=true;
    }
    else 
    alert("Merci de sélectionner un client ou ajouter un nouveau client")
  }
  clear()
  {
    this.clientForm.reset();
    this.lentilleOeilForm.reset();
    this.oeil_lentille=false;
  }
  recherchGlobalTS()
  {
    const i:Number=0;
    this.clients1=this.Clientservice.clientss;
    var varid=this.clientForm.get('idF').value;
    var varName=this.clientForm.get('nameF').value;
    var varprenom=this.clientForm.get('prenomF').value;
    //let client = this.clients1.find(data => data.name === varName ||  data.id===+varid ||data.prenom===varprenom);
    this.clients=[];
    for( let clt of this.clients1)
    {
      let client = this.clients1.find(data => data.name === varName);
      console.log(client);
      this.clients.push(client);
      
    }
    //console.log(client);
    //console.log(this.clients);
   // console.log(this.clients1);
   // this.clients=[];
    //this.clients.push(client);
    /*this.clients.length=0;
    console.log("client"+this.clients);
    console.log("---------------");
    console.log("client1"+this.clients1);
    //this.clients.push(client);*/

    /*this.clients=client;
    console.log(client);
    this.id=this.Clientservice.rechercherClientById(+varid).id;
    this.name=this.Clientservice.rechercherClientById(+varid).name;
    this.prenom=this.Clientservice.rechercherClientById(+varid).prenom;
    this.ville=this.Clientservice.rechercherClientById(+varid).ville;
    this.email=this.Clientservice.rechercherClientById(+varid).email;
    this.sexe=this.Clientservice.rechercherClientById(+varid).sexe;  
    this.cin=this.Clientservice.rechercherClientById(+varid).cin;  
    this.addresse=this.Clientservice.rechercherClientById(+varid).addresse;  
    this.numeroTel=this.Clientservice.rechercherClientById(+varid).numeroTel;*/
  }
  typeLunetteLentille()
  {
    var vartype=this.lentilleOeilForm.get('typeCorF').value;
    if(vartype==="Lunette")
    {
      this.activeLunette=true;
      this.activeLentille=false;
    }
    if(vartype==="Lentille")
    {
      this.activeLunette=false;
      this.activeLentille=true;
    }
  }
prixTotal()
{
  this.PrixTotal=this.Prix_D+this.Prix_G+this.PrixMont;
}
}

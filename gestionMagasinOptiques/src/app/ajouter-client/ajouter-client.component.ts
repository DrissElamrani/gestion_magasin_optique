import { Component, OnInit, Input, ɵConsole } from '@angular/core';
import { ClientService } from '../services/client.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { Subscription } from 'rxjs';
import { Client } from '../model/client';
import { UserJournals } from '../model/UserJournals';
import { User } from '../model/user';
import { Authservices } from '../services/auth.services';
import {UserJournalService} from '../services/userJournal.service';
@Component({
  selector: 'app-ajouter-client',
  templateUrl: './ajouter-client.component.html',
  styleUrls: ['./ajouter-client.component.css']
})
export class AjouterClientComponent implements OnInit {

  ngOnInit() {

  }
  /*listClients: Client[];
  clt: Client;
  journal = new UserJournals();
  newClt = new Client();
  userAuthID : Number;
  clients: any[];
  clients1: any[];
  @Input() id: number;
  @Input() name: String;
  @Input() prenom: String;
  @Input() ville: String;
  @Input() email: String;
  @Input() sexe: String;
  @Input() cin: String;
  @Input() addresse: String;
  @Input() numeroTel: String;
  oeil_lentille: boolean = false;
  activeLunette: boolean = false;
  activeLentille: boolean = false;
  Prix_D: number = 0;
  Prix_G: number = 0;
  PrixMont: number = 0;
  Prix_L_D: number = 0;
  Prix_L_G: number = 0;
  QuntMont: number = 1;
  totalMonture: number;
  totalLentille: number;
  totalLunette: number;
  totalMontant_HT: number;
  totalMontant_TTC: number;
  versement: number = 0;
  rest: number;
  counterSubscription: Subscription;
  constructor(private fb: FormBuilder, private Clientservice: ClientService, private router: Router,private authService:Authservices,private UserJournalService:UserJournalService) { }
  clientForm = this.fb.group({
    idF: [''], nameF: ['', Validators.required], prenomF: ['', Validators.required], villeF: [''],
    emailF: ['', [Validators.required, Validators.email]], sexeF: [''], cinF: [''], addresseF: [''],
    numeroTelF: ['', [Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)]]
  });

  lentilleOeilForm = this.fb.group({
    typeCorF: ['', Validators.required],
    idF: ['', Validators.required], sphF_G: [''], cylF_G: [''],
    axeF_G: [''], V_LoinF_G: [''],
    V_presF_G: [''], natureF_G: [''], PrixF_G: ['', [Validators.pattern(/^[.\d]+$/)]], sphF_D: [''],
    cylF_D: [''], axeF_D: [''], V_LoinF_D: [''], V_presF_D: [''],
    natureF_D: [''], PrixF_D: ['', [Validators.pattern(/^[.\d]+$/)]],
    typeMontureF: [''], QuntMontF: [''],
    PrixMontF: ['', [Validators.pattern(/^[.\d]+$/)]],
    PrixTotalF: ['', [Validators.pattern(/^[.\d]+$/)]], restF: [''],

    sphF_L_G: [''], cylF_L_G: [''], axeF_L_G: [''], V_LoinF_L_G: [''],
    V_presF_L_G: [''], natureF_L_G: [''], PrixF_L_G: [''], sphF_L_D: [''],
    cylF_L_D: [''], axeF_L_D: [''], V_LoinF_L_D: [''], V_presF_L_D: [''],
    natureF_L_D: [''], PrixF_L_D: ['', [Validators.pattern(/^[.\d]+$/)]],
    versementF: ['', [Validators.pattern(/^[.\d]+$/)]]
  });
  enregestreClientTs() {

    var existClt = this.newClt.idClt = this.clientForm.get('idF').value;
    this.newClt.nom = this.clientForm.get('nameF').value;
    this.newClt.prenom = this.clientForm.get('prenomF').value;
    this.newClt.email = this.clientForm.get('emailF').value;
    this.newClt.addresse = this.clientForm.get('addresseF').value;
    this.newClt.telephone = this.clientForm.get('numeroTelF').value;
    if (existClt == null || existClt == "") {
      this.journal.action = "Ajouter Client";
      this.Clientservice.ajouterClient(this.newClt).subscribe(
        data => {
          //console.log(data.status);
          if (data!=null && data.status == 201) {
            alert("le Client est Ajouter avec succes!!");
            this.ajouterJournal(this.journal, 1);
            this.getAllClients();
          }
        }
      );
      // alert("le Client est ajouter avec succes!!");
    }
    if (existClt != null && existClt != "") {
      if (confirm('êtes-vous sûr de vouloir vous modifier se client??')) {
      this.journal.action = "Update Client";
      this.Clientservice.modifierClient(this.newClt, existClt).subscribe(
        data => {
          console.log(data.status);
          if (data.status == 200) {
            alert("le Client est modifier avec succes!!");
            this.ajouterJournal(this.journal, 1);
            this.getAllClients();
          }
        }
      );
    }
      //  alert("le Client est modifier avec succes!!");
    }

  }

  ajouterJournal(j: UserJournals, id) {
    this.UserJournalService.ajouterJournal(j, id).subscribe(
      data => {
        console.log(data);
      }
    );
  }
  getClientById(id: number) {
    this.Clientservice.getClientById(id).subscribe(

      data => {
        this.clt = data;
        this.id = this.clt.idClt;
        this.name = this.clt.nom;
        this.prenom = this.clt.prenom;
        this.email = this.clt.email;
        this.addresse = this.clt.addresse;
        this.numeroTel = this.clt.telephone;
      }
    );
  }

  supprimerclientTS(id: number) {
    if (confirm('êtes-vous sûr de vouloir vous supprimer ce client??')) {
      this.journal.action = "Supprimer Client";
      this.Clientservice.supprimerClient(id).subscribe(
        data => {
          //console.log(data.status);
          if (data.status == 200) {
            alert("le Client est supprimer avec succes!!");
            this.ajouterJournal(this.journal, 1);
            this.getAllClients();
          }
        }
      );


      //  alert("le Client est supprimer avec succes!!");

    }
  }
  getAllClients() {
    this.Clientservice.getListClients().subscribe(
      data => {
        this.listClients = data;
      }

    );
  }
  ngOnInit() {
   // this.clients = this.Clientservice.clientss;
   this.userAuthID = this.authService.currentUser.idUser;
   console.log(this.userAuthID);
    this.getAllClients();

    const counter = Observable.interval(1000);
    this.counterSubscription = counter.subscribe(
      (value) => {
        this.totalMonture = (+this.PrixMont) * (+this.QuntMont);
        this.totalLunette = ((+this.Prix_D) + (+this.Prix_G));
        this.totalLentille = ((+this.Prix_L_D) + (+this.Prix_L_G));
        this.totalMontant_HT = this.totalMonture + this.totalLunette + this.totalLentille;
        this.totalMontant_TTC = this.totalMontant_HT + ((this.totalMontant_HT / 100) * 20);
        this.rest = (this.totalMontant_TTC) - (+this.versement);
      }
    );
  }

  ajouterOeilLentille() {
    var varid = this.clientForm.get('idF').value;
    if (varid != null) {
      this.oeil_lentille = true;
    }
    else
      alert("Merci de sélectionner un client ou ajouter un nouveau client")
  }
  clear() {
    this.clientForm.reset();
    this.lentilleOeilForm.reset();
    this.oeil_lentille = false;
  }

  typeLunetteLentille() {
    var vartype = this.lentilleOeilForm.get('typeCorF').value;
    if (vartype === "Lunette") {
      this.activeLunette = true;
      this.activeLentille = false;
    }
    if (vartype === "Lentille") {
      this.activeLunette = false;
      this.activeLentille = true;
    }
  }*/

}

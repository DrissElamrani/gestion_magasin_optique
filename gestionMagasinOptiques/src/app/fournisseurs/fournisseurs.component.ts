import { Component, OnInit } from '@angular/core';
import { FournisseurService } from '../services/fournisseur.service';
import { Fournisseur } from '../model/fournisseur';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-fournisseurs',
  templateUrl: './fournisseurs.component.html',
  styleUrls: ['./fournisseurs.component.css']
})

export class FournisseursComponent implements OnInit {

  fournisseurs : Array<Fournisseur>;

  newFournisseurBuilder : FormGroup = this.formBuilder.group({
    raison_social : ['',[Validators.required]],
    tel: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)]],
    fax: ['', [Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)]],
    email: ['', [Validators.required,Validators.email]],
    ice: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(15), Validators.maxLength(15)]],
    adress: ['', [Validators.maxLength(250), Validators.minLength(10)]],
  });

  constructor(private frService : FournisseurService,private formBuilder:FormBuilder) { 
    this.fournisseurs = this.frService.fournisseurs;
  }

  ngOnInit() {

  }

  field(feildName:string){
    return this.newFournisseurBuilder.get(feildName);
  }

  createHandler(){
      let values = this.newFournisseurBuilder.value;
      let Fnr : Fournisseur = {
          raison_social : values.raison_social,
          adress : values.adress,
          tel : values.tel,
          fax : values.fax,
          email : values.email,
          ice : values.ice
      }
      this.frService.CreateFournisseur(Fnr);
      this.newFournisseurBuilder.reset();
  }



}

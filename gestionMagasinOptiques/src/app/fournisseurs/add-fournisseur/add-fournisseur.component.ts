import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { FournisseurService } from '../../services/fournisseur.service';
import { Fournisseur } from '../../model/fournisseur';

@Component({
  selector: 'app-add-fournisseur',
  templateUrl: './add-fournisseur.component.html',
  styleUrls: ['./add-fournisseur.component.css']
})
export class AddFournisseurComponent implements OnInit {

  newFournisseurBuilder : FormGroup = this.formBuilder.group({
    raison_social : ['',[Validators.required]],
    tel: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)]],
    fax: ['', [Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)]],
    email: ['', [Validators.required,Validators.email]],
    ice: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(15), Validators.maxLength(15)]],
    adress: ['', [Validators.maxLength(250), Validators.minLength(10)]],
  });

  constructor(private frService : FournisseurService,private formBuilder:FormBuilder) { }

  ngOnInit() {
  }

  field(feildName:string){
    return this.newFournisseurBuilder.get(feildName);
  }

  createHandler(){
      let values = this.newFournisseurBuilder.value;
      let Fnr : Fournisseur = {
          fournisseur_id:3,
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

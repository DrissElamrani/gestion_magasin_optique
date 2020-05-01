import { Injectable } from '@angular/core';
import { Fournisseur } from '../model/fournisseur';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  constructor() { }

  fournisseurs: Array<Fournisseur> = [
    {
      fournisseur_id: 1,
      raison_social: "KODAK",
      adress: "Bd Mohamed 5 - ANFA",
      tel: "0522-181852",
      fax: "0522-181842",
      email: "contact@kodak.com",
      ice: "0000512514485",
    },
    {
      fournisseur_id: 2,
      raison_social: "PRADA",
      adress: "Bd IBRAHIM ROUDANI - MAARIF",
      tel: "0522-121418",
      fax: "0522-121420",
      email: "contact@prada.ma",
      ice: "0000521747521",
    }
  ];


  CreateFournisseur(fournisseur:Fournisseur){
    this.fournisseurs.push(fournisseur);
  }

  DeleteFournisseur(fournisseur:Fournisseur){
    this.fournisseurs.map((item)=>{
        if(item.fournisseur_id === fournisseur.fournisseur_id) {
          let index = this.fournisseurs.indexOf(item);
          this.fournisseurs.splice(index,1);
          return true;
        }
    });
  }

}

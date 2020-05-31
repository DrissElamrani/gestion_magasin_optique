import { Component, OnInit } from '@angular/core';
import { FournisseurService } from '../services/fournisseur.service';
import { Fournisseur } from '../model/fournisseur';


@Component({
  selector: 'app-fournisseurs',
  templateUrl: './fournisseurs.component.html',
  styleUrls: ['./fournisseurs.component.css']
})

export class FournisseursComponent implements OnInit {

  fournisseurs : Array<Fournisseur>;


  constructor(private frService : FournisseurService) { 
    this.fournisseurs = this.frService.fournisseurs;
  }

  ngOnInit() {

  }



}

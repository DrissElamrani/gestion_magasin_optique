import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { LunetteSolaire } from 'src/app/model/lunetteSolaire';
import { LunetteSolaireService } from 'src/app/services/lunetteSolaire.service';

@Component({
  selector: 'app-add-lunette-solaire',
  templateUrl: './add-lunette-solaire.component.html',
  styleUrls: ['./add-lunette-solaire.component.css']
})
export class AddLunetteSolaireComponent implements OnInit {

  loading = false;

  constructor(private LunetteSolaireService: LunetteSolaireService,private formBuilder:FormBuilder) { }

  ngOnInit() {
  }

  lunetteSolaireBuilder : FormGroup = this.formBuilder.group({
    nomProd: ['',[Validators.required]],
    qteProd: ['',[Validators.required,Validators.pattern('[0-9]*')]],
    prixUnitaire: ['', [Validators.required]],
    categorie: ['',[Validators.maxLength(255)]],
    type: ['', [Validators.required, Validators.minLength(6)]],
  });

  field(feildName:string){
    return this.lunetteSolaireBuilder.get(feildName);
  }

  createHandler(){
    this.loading = true;
    let values = this.lunetteSolaireBuilder.value;
    let lunetteSolaire : LunetteSolaire = {
      nomProd: values.nomProd,
      qteProd: values.qteProd,
      prixUnitaire: values.prixUnitaire,
      categorie: values.categorie,
      type: values.type,
    }
    this.LunetteSolaireService.store(lunetteSolaire).subscribe(
      next => {
        Swal.fire(
          'Good job!',
          'Produit à été bien enregistré',
          'success'
        );
        this.lunetteSolaireBuilder.reset();
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

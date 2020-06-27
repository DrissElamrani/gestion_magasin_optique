import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Monture } from 'src/app/model/monture';
import { MontureService } from 'src/app/services/monture.service';


@Component({
  selector: 'app-add-monture',
  templateUrl: './add-monture.component.html',
  styleUrls: ['./add-monture.component.css']
})
export class AddMontureComponent implements OnInit {

  loading = false;

  constructor(private montureService: MontureService,private formBuilder:FormBuilder) { }

  ngOnInit() {
  }

  montureBuilder : FormGroup = this.formBuilder.group({
    nomProd: ['',[Validators.required]],
    qteProd: ['',[Validators.required,Validators.pattern('[0-9]*')]],
    prixUnitaire: ['', [Validators.required]],
    categorie: ['',[Validators.maxLength(255)]],
    type: ['', [Validators.required, Validators.minLength(6)]],
  });

  field(feildName:string){
    return this.montureBuilder.get(feildName);
  }

  createHandler(){
    this.loading = true;
    let values = this.montureBuilder.value;
    let monture : Monture = {
      nomProd: values.nomProd,
      qteProd: values.qteProd,
      prixUnitaire: values.prixUnitaire,
      categorie: values.categorie,
      type: values.type,
    }
    this.montureService.store(monture).subscribe(
      next => {
        Swal.fire(
          'Good job!',
          'Produit à été bien enregistré',
          'success'
        );
        this.montureBuilder.reset();
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

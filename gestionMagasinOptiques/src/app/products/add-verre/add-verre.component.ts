import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Verre } from 'src/app/model/verre';
import { VerreService } from 'src/app/services/verre.service';

@Component({
  selector: 'app-add-verre',
  templateUrl: './add-verre.component.html',
  styleUrls: ['./add-verre.component.css']
})
export class AddVerreComponent implements OnInit {

  loading = false;

  constructor(private verreService: VerreService,private formBuilder:FormBuilder) { }

  ngOnInit() {
  }

  verreBuilder : FormGroup = this.formBuilder.group({
    nomProd: ['',[Validators.required]],
    qteProd: ['',[Validators.required,Validators.pattern('[0-9]+([\.,][0-9]+)?')]],
    prixUnitaire: ['', [Validators.required,Validators.pattern('[0-9]+([\.,][0-9]+)?')]],
    sph :  ['',[Validators.required,Validators.pattern('[0-9]+([\.,][0-9]+)?')]],
    cyl :  ['',[Validators.required,Validators.pattern('[0-9]+([\.,][0-9]+)?')]],
    axe : ['',[Validators.required,Validators.pattern('[0-9]+([\.,][0-9]+)?')]],
    addV : ['',[Validators.required,Validators.pattern('[0-9]+([\.,][0-9]+)?')]],
    visionPres : ['',[Validators.required,Validators.pattern('[0-9]+([\.,][0-9]+)?')]],
    visionLoin : ['',[Validators.required,Validators.pattern('[0-9]+([\.,][0-9]+)?')]],
    nature :['',[Validators.required]],
    oeilGaucheDroit : ['',[Validators.required]],
  });

  field(feildName:string){
    return this.verreBuilder.get(feildName);
  }

  createHandler(){
    this.loading = true;
    let values = this.verreBuilder.value;
    let verre : Verre = {
      nomProd: values.nomProd,
      qteProd: values.qteProd,
      prixUnitaire: values.prixUnitaire,
      sph : values.sph,
      cyl : values.cyl,
      axe : values.axe,
      addV : values.addV,
      visionPres : values.visionPres,
      visionLoin : values.visionLoin,
      nature : values.nature,
      oeilGaucheDroit : values.oeilGaucheDroit,
      
    }

    this.verreService.store(verre).subscribe(
      next => {
        Swal.fire(
          'Good job!',
          'Produit à été bien enregistré',
          'success'
        );
        this.verreBuilder.reset();
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

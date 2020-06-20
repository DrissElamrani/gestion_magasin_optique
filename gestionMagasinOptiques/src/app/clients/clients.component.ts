import { Component, OnInit } from '@angular/core';
import { Client } from '../model/client';
import { ClientService } from '../services/client.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients : Client[];


  constructor(private clientService : ClientService,private router:Router) { }

  ngOnInit() {
      this.getClients();
  }

  getClients(){
     this.clientService.getClients().subscribe(
      (data) => {
       this.clients = data;
      }
   );
  }

  editUser(id : number){
      this.router.navigate(['/client/'+id]);
  }

  deleteUser(id : number){
    Swal.fire({
      title: 'êtes-vous sûr?',
      text: "cette action est irréversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!'
    }).then((result) => {
      if (result.value) {
        
        this.clientService.supprimerClient(id).subscribe(
          next => {
            this.getClients();
            Swal.fire(
              'Good job!',
              'Client à été bien supprimé',
              'success'
            );
          },
          error => {
            console.log(error);
          }
        );

      }
    })
  }

}

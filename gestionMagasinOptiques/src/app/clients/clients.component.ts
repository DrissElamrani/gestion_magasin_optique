import { Component, OnInit } from '@angular/core';
import { Client } from '../model/client';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients : Client[];


  constructor(private clientService : ClientService) { }

  ngOnInit() {
      this.getUsers();
  }

  getUsers(){
     this.clientService.getClients().subscribe(
      (data) => {
       this.clients = data;
       console.log(this.clients);
      }
   );
  }

}

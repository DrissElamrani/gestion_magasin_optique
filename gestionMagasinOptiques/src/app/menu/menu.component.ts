import { Component, OnInit } from '@angular/core';
import { Authservices} from '../services/auth.services'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private auth:Authservices) { }

  ngOnInit() {
  }

  signOut() {
    if(confirm('êtes-vous sûr de vouloir vous déconnecter?')) {
      this.auth.signOut();
    }
  }

}

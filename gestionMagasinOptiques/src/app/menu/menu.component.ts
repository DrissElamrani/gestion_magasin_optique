import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authservices} from '../services/auth.services'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private auth:Authservices,private router:Router) { }

  ngOnInit() {
  }

  logout() {
     this.auth.signOut();
     this.router.navigate(['/auth']);
  }

}

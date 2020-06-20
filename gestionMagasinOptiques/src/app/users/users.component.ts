import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users : User[];

  constructor(private userService: UserService,private router:Router) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe(
     (data) => {
      this.users = data;
     }
  );
 }

 editUser(id : number){
  this.router.navigate(['/user/'+id]);
 }

}

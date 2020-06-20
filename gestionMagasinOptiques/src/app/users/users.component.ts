import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
      
      this.userService.supprimerUser(id).subscribe(
        next => {
          this.getUsers();
          Swal.fire(
            'Good job!',
            'Utilisateur à été bien supprimé',
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

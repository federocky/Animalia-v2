import { UserService } from './../../../../services/user.service';
import { User } from './../../../../models/user.model';
import { Component, OnInit } from '@angular/core';

//sweet alert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-crud',
  templateUrl: './users-crud.component.html',
  styleUrls: ['./users-crud.component.scss']
})
export class UsersCrudComponent implements OnInit {

  users: User[] = [];
  openForm = false;
  user: User;
  term: string;
  order:string;

  constructor( private _userService: UserService) { }

  ngOnInit(): void {
    this.showLoading();
    this.loadUsers();
  }

  loadUsers(){
    this._userService.getUsers()
      .subscribe( (res: any) => {

        this.users = res.data;
        Swal.close();

      }, err => {
        console.log(err);

        Swal.fire({
          allowOutsideClick: true,
          title: 'Oops...',
          icon: 'warning',
          text: 'Error en la conexión'
        });
      })
  }

  delete( id: number){
    this._userService.deleteUser( id )
      .subscribe( (res:any) => {
        this.loadUsers();
      }, err => {
        this.showError();
      })
  }


  activate( id: number) {
    this._userService.recoverUser( id )
      .subscribe( (res: any) => {
        this.loadUsers();
      }, err => {
        console.log(err);
        this.showError();
      })
  }

  openNewForm(){
    this.user = null;
    this.openForm = true;
  }

  showLoading(){
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'
    });
    Swal.showLoading();
  }

  showError(){
    Swal.fire({
      allowOutsideClick: true,
      title: 'Oops...',
      icon: 'warning',
      text: 'Algo ha ido mal, intentelo mas tarde'
    });
  }

  showSuccess( message: string ){

    Swal.fire({
      icon: 'success',
      title: 'Genial',
      text: message,
    });
  }
}

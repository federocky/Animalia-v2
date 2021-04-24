import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/models/address.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

//sweet alert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  public user: User;
  public address: Address;

  openAddressForm: boolean = false;


  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this.showLoading();

    let userId = JSON.parse(localStorage.getItem('user')).id;

    this.loadUser(userId);
  }

  loadUser( id: number ){
    this._userService.getUser(id)
    .subscribe( (res:any) => {
      
      this.user = res.data[0];
      Swal.close();

    }, err => {
      this.showError();
    });
  }

  
  deleteAddress( id: number ){
    this._userService.deleteAddress(id)
      .subscribe( (res:any) => {

        if(!res.ok) throw new Error;

        this.showLoading();
        this.loadUser(this.user.id);

      }, err => {
        this.showError();
      });
  }

  setMain( id: number ){
    this._userService.setAddressAsMain(id)
      .subscribe( (res:any) => {

        if(!res.ok) throw new Error;

        this.showLoading();
        this.loadUser(this.user.id);

      }, err => {

        this.showError();
        console.log(err);

      });
  }

  showAddressForm( address: Address ){
    this.address = address;
    this.openAddressForm = true;
  }

  addressRecived( address: Address ){

    this.openAddressForm = false;

    this._userService.updateAddress( address )
      .subscribe( (res: any) => {

        if(res.ok){
          this.showLoading();
          this.loadUser(this.user.id);
        }

      }, err => {
        this.showError();
      });
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

}

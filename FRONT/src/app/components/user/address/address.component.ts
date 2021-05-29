import { SwalService } from './../../../services/swal.service';
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
  public saveNew = false;

  openAddressForm: boolean = false;


  constructor(private _userService: UserService,
              private _swalService: SwalService
    ) { }

  ngOnInit(): void {
    this._swalService.showLoading();

    let userId = JSON.parse(localStorage.getItem('user')).id;

    this.loadUser(userId);
  }

  loadUser( id: number ){
    this._userService.getUser(id)
    .subscribe( (res:any) => {

      this.user = res.data[0];
      Swal.close();

    }, err => {
      this._swalService.showError();
    });
  }


  deleteAddress( id: number ){
    this._userService.deleteAddress(id)
      .subscribe( (res:any) => {

        if(!res.ok) throw new Error;

        this._swalService.showLoading();
        this.loadUser(this.user.id);

      }, err => {
        this._swalService.showError();
      });
  }

  setMain( id: number ){
    this._userService.setAddressAsMain(id)
      .subscribe( (res:any) => {

        if(!res.ok) throw new Error;

        this._swalService.showLoading();
        this.loadUser(this.user.id);

      }, err => {

        this._swalService.showError();
        console.log(err);

      });
  }

  showAddressForm( address: Address ){
    this.address = address;
    this.openAddressForm = true;
  }

  addressRecived( address: Address ){

    this.openAddressForm = false;

    if(this.saveNew) this.storeNewAddress(address);
    else this.updateAddress(address);


  }

  onStoreNewAddress(){
    this.openAddressForm = true;
    this.saveNew = true;
  }

  storeNewAddress( address: Address ){
    this.saveNew = false;

    this._userService.setAddress( address )

      .subscribe( (res: any) => {
          this._swalService.showLoading();
          this.loadUser(this.user.id);

      }, err => {
        this._swalService.showError();
      });
  }

  updateAddress( address: Address ){
    this._userService.updateAddress( address )

    .subscribe( (res: any) => {
        this._swalService.showLoading();
        this.loadUser(this.user.id);

    }, err => {
      this._swalService.showError();
    });
  }

}

import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { UserService } from './../../../services/user.service';
import { CartService } from './../../../services/cart.service';
import { OrderService } from './../../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { Address } from '../../../models/address.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  hasAddress: boolean;

  user: User;
  address: Address;

  openAddressForm: boolean = false;

  constructor( private _userService: UserService,
               private _authService: AuthService,
               private router: Router          
    ) { }

  ngOnInit(): void {
      
    //si no esta logado lo mando fuera
    if( !this._authService.loggedIn() ) this.router.navigateByUrl('checkout/detalles')

    /**Si esta logado recupero los datos de usuario del local storage*/
    this.user = JSON.parse(localStorage.getItem('user'));

    //recuperamos  direccion de la bbdd.
    this._userService.getAddress( this.user.id )
      .subscribe( (res:any) => {

        //si tiene direccion
        this.hasAddress = true;
        this.address = res.data;

      }, err => {
        //si no tiene direccion
        this.hasAddress = false;
      });

  }


  

  addressRecived( address: Address ){
    this.address = address;

    this.hasAddress = true;
    this.openAddressForm = false;

    /**si user.id es null el cliente es invitado por tanto se cargara al cliente invitado*/
    this._userService.setAddress( this.user.id, this.address )
      .subscribe( (res: any) => {
        this.address.id = res.address_id;
      })
  }



  savePhone(){
    console.log(this.user.phone);
    this._userService.updateUser( this.user )
      .subscribe( (res:any) => {
        console.log(res);
      });
  }


  payNow(){
    localStorage.setItem('address', JSON.stringify(this.address));
    this.router.navigateByUrl('checkout/pasarela');
  }
}

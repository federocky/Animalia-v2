import { SwalService } from './../../../services/swal.service';
import { CartService } from './../../../services/cart.service';
import { OrderService } from './../../../services/order.service';
import { Cart } from './../../../models/cart.model';
import { Component, OnInit } from '@angular/core';
import { Address } from '../../../models/address.model';
import { User } from 'src/app/models/user.model';
import  Swal  from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pasarela',
  templateUrl: './pasarela.component.html',
  styleUrls: ['./pasarela.component.scss']
})
export class PasarelaComponent implements OnInit {

  address: Address;
  user: User;
  cart: Cart;

  pagado: boolean = false;



  constructor( private _orderService: OrderService,
               private router: Router,
               private _cartService: CartService,
               private _swalService: SwalService
    ) { }

  ngOnInit(): void {

    if(! localStorage.getItem('cart') ) this._cartService.getCart();
    else this.cart = JSON.parse(localStorage.getItem('cart'));

    if(!localStorage.getItem('address') || !localStorage.getItem('user') || !this.cart || this.cart.total == 0) {
      this._swalService.showError();
      this.router.navigateByUrl("index");
    }

    this.address = JSON.parse(localStorage.getItem('address'));
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  pay(){

    this._orderService.store( this.address.id, this.cart)
      .subscribe( (res:any)  => {

        Swal.fire({
          icon: 'success',
          title: 'Pedido realizado con éxito',
          html: '<h3 class="text-success">numero de pedido '+res.order_id+'</h3>',
          allowOutsideClick: false,
          showConfirmButton: true,
        }).then((result) => {
          this.deleteShoppingInfo();
          if(result.isConfirmed) this.router.navigateByUrl('home');
        });

      }, err => {

        console.log(err);

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          html: '<h6 class="text-success">Alguien se te ha adelantado y el stock de alguno de tus productos ha cambiado</h6>',
          allowOutsideClick: false

        }).then((result) => {

          //TODO: seria mejor saber que producto tiro el error y actualizarlo en el carro.
          //Lo dejo como posible mejora.
          this.deleteShoppingInfo();
          this.router.navigateByUrl('tienda');

        });
      });
  }


  deleteShoppingInfo(){
    localStorage.removeItem('cart');
    localStorage.removeItem('cartItemCount');
    localStorage.removeItem('address');
    this._cartService.emptyCart();
  }

}

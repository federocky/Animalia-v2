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
               private _cartService: CartService
    ) { }

  ngOnInit(): void {
    this.address = JSON.parse(localStorage.getItem('address'));
    this.user = JSON.parse(localStorage.getItem('user'));
    this.cart = JSON.parse(localStorage.getItem('cart'));

    
  }

  pay(){

    this._orderService.store( this.user.id, this.address.id, this.cart)
      .subscribe( (res:any)  => {
        console.log(res);

        this.deleteShoppingInfo();

        Swal.fire({
          icon: 'success',
          title: 'Pedido realizado con éxito',
          html: '<h3 class="text-success">numero de pedido '+res.order_id+'</h3>',
          allowOutsideClick: false,
          showConfirmButton: true,
        }).then((result) => {
          //si se elige logar/registrar
          if(result.isConfirmed) this.router.navigateByUrl('home');
        });

      }, err => {
        console.log(err);
      }); 
  }


  deleteShoppingInfo(){
    localStorage.removeItem('cart');
    localStorage.removeItem('cartItemCount');
    localStorage.removeItem('address');
    this._cartService.emptyCart();
  }
}

import { Cart } from './../../../../models/cart.model';
import { CartService } from './../../../../services/cart.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Variables } from 'src/app/common/utils';
import { Product } from 'src/app/models/product';
import { ProductQty } from 'src/app/models/product-qty';

@Component({
  selector: 'app-carro',
  templateUrl: './carro.component.html',
  styleUrls: ['./carro.component.scss']
})
export class CarroComponent implements OnInit {

  //almacenaremos los productos que contiene el carro
  cart: Cart;

  //ruta de las imagenes correspodientes a los productos
  imgRoute: string = Variables.imgRouteProducts;

  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
    this.updateCart();
  }

  deleteProduct( product: Product ): void{
    this._cartService.removeProduct(product);
    this.updateCart();
  }

  
  decreaseItem( product: Product ): void{
    this._cartService.decreaseProduct(product);
    this.updateCart();
  }
  
  increaseItem( product: ProductQty ): void{
    this._cartService.increaseProduct(product);
    this.updateCart();
    console.log(product);
  }

  updateCart(): void {
    this.cart = this._cartService.getCart();
  }

}

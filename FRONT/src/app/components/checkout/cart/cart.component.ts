import { ProductQty } from './../../../models/product-qty';
import { Cart } from './../../../models/cart.model';
import { CartService } from './../../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Variables } from 'src/app/common/utils';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  //ruta de la imagen
  imgRoute: string = Variables.imgRouteProducts;

  //carro donde almacenamos los productos
  cart: Cart;

  //variable necesario para pintar estrellas
  cantidadEstrellas = [1, 2, 3, 4, 5];

  
  outOfStock: boolean = false;


  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
    this.cart = this._cartService.getCart();
  }

  decreaseItem(product: ProductQty): void{
    if(product.qty > 1) {
      this._cartService.decreaseProduct(product.product);
    }
    if(this.outOfStock) this.outOfStock = false;
  }

  increaseItem(product: ProductQty): void{
    if(product.product.stock > product.qty) this._cartService.increaseProduct(product);
    else this.outOfStock = true;
    setTimeout(() => {
      this.outOfStock = false;
    }, 4000);
  }

  deleteProduct( product: Product ):void{
    this._cartService.removeProduct( product );
  }

}

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
    this.getCart();
  }



  /**
   * Elimina todas las existencias del producto del carro
   * @param product objecto producto
   */
  deleteProduct( product: Product ): void{
    this._cartService.removeProduct(product);
  }




  /**
   * quita una unidad de producto del carro
   * @param product objeto producto
   */
  decreaseItem( product: Product ): void{
    this._cartService.decreaseProduct(product);
  }
  


  /**
   * aumenta en una unidad la cantidad del producto en el carro
   * @param product Objeto productQty necesario para el control de stock
   */
  increaseItem( product: ProductQty ): void{
    this._cartService.increaseProduct(product);
  }


  //recupera el carro del servicio.
  getCart(): void {
    this._cartService.getCart()
      .subscribe( (res: Cart) => {
        this.cart = res;
      })
  }

}

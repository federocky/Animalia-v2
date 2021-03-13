import { ProductQty } from './../models/product-qty';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  //TODO: esta bien el productQty???
  private cart: ProductQty[] = [];

  //cantidad de productos en el carro.
  private cartItemCount = new BehaviorSubject(0);

  constructor() { }


  //devolvemos todo el carro
  getCart(){
    return this.cart;
  }


  //devolvemos la cantidad de articulos en el carro
  getCartItemCount(){
    return this.cartItemCount;
  }



  /**
   * Funcion que agrega uno mas productos en el carro.
   * @param product producto a agregar
   * @param quantity cantidad, default 1
   */
  addProduct(product: Product, quantity: number = 1): void {

    ///comprobaremos si ya hay uno igual
    let added = false;

    //miramos a ver si ya tenemos este producto
    //FIXME: no me convence un for, a ver si se te ocurre otra cosa. o meterle un break para que no vaya hasta el final
    for (let prod of this.cart) {

      //si hay uno igual
      if (prod.product.id === product.id) {
        prod.qty += quantity;
        added = true;
      }
    }

    //si no hay uno igual
    if (!added) {
      const prod: ProductQty = {
        qty: quantity,
        product
      }
      this.cart.push(prod);
    }

    //actualizamos la cuenta.
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }




  /**
   * Funcion que quita una unidad de producto del carro
   * @param product tipo Product para descontar
   */
  decreaseProduct(product: Product):void  {

    ///miramos cuantos de esos productos tengo
    for (let [index, p] of this.cart.entries()) {

      //buscamos el producto
      if (p.product.id === product.id) {

        //quitamos una unidad
        p.qty -= 1;

        //si nos quedamos en cero eliminamos el producto
        if (p.qty == 0) {
          this.cart.splice(index, 1);
        }
      }
    }

    //actualizamos la lista de productos en el carro
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }





  /**
   * Elimina todas las unidades de este producto del carro.
   * @param product Product
   */
  removeProduct(product: Product): void {

    //buscamos un prod
    for (let [index, p] of this.cart.entries()) {

      //si lo encontramos
      if (p.product.id === product.id) {

        //actualizamos la cantidad de productos en el carro
        this.cartItemCount.next(this.cartItemCount.value - p.qty);

        //lo quitamos
        this.cart.splice(index, 1);
      }
    }
  }


  

  //vaciamos el carro
  emptyCart():void {
    
    //vaciamos el carro
    this.cart = [];

    //vaciamos la cuenta de articulos
    this.cartItemCount.next(0);
  }


}

import { Cart } from './../models/cart.model';
import { ProductQty } from './../models/product-qty';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  //TODO: quizas debo pasar los metodos a la clase?
  private cart: Cart = {productQty: [], total: 0};

  //cantidad de productos en el carro.
  private cartItemCount = new BehaviorSubject(0);

  constructor() { }


  //devolvemos todo el carro
  getCart(){
    //si tenemos algo en el localStorage lo actualizamos.
    if (localStorage.getItem("cart") !== null) this.cart = this.getCartLocalStorage();
    return this.cart;
  }


  //devolvemos la cantidad de articulos en el carro
  getCartItemCount(){
    //si tenemos algo en el local storage lo actualizamos
    if(localStorage.getItem("cartItemCount") !== null) this.cartItemCount.next(this.getCartItemCountLocalStorage());
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
    for (let prod of this.cart.productQty) {

      //si hay uno igual
      if (prod.product.id === product.id) {
        prod.qty += quantity;

        if(prod.qty > prod.product.stock) {
          prod.qty = prod.product.stock;
        }
        added = true;
      }
    }

    //si no hay uno igual
    if (!added) {
      const prod: ProductQty = {
        qty: quantity,
        product
      }
      this.cart.productQty.push(prod);
    }

    //actualizamos la cuenta.
    this.updateItemsCount();

    //actualizamos el total
    this.updateTotal();

    //actualizamos el localStorage
    this.setLocalStorage();
  }


    /**
   * Funcion que quita una unidad de producto del carro
   * @param product tipo Product para descontar
   */
     increaseProduct(productQty: ProductQty): boolean  {

      //controlamos el stock
      if(productQty.qty >= productQty.product.stock) return false;

      ///miramos cuantos de esos productos tengo
      for (let [index, p] of this.cart.productQty.entries()) {
  
        //buscamos el producto
        if (p.product.id === productQty.product.id) {
  
          //agregamos una unidad
          p.qty += 1;

        }
      }
  
      //actualizamos la cantidad de productos en el carro
      this.cartItemCount.next(this.cartItemCount.value + 1);
  
      //actualizamos el total
      this.updateTotal();

      //actualizamos el localStorage
      this.setLocalStorage();
    }



  /**
   * Funcion que quita una unidad de producto del carro
   * @param product tipo Product para descontar
   */
  decreaseProduct(product: Product):void  {

    ///miramos cuantos de esos productos tengo
    for (let [index, p] of this.cart.productQty.entries()) {

      //buscamos el producto
      if (p.product.id === product.id) {

        //quitamos una unidad
        p.qty -= 1;

        //si nos quedamos en cero eliminamos el producto
        if (p.qty == 0) {
          this.cart.productQty.splice(index, 1);
        }
      }
    }

    //actualizamos la lista de productos en el carro
    this.cartItemCount.next(this.cartItemCount.value - 1);

    //actualizamos el total
    this.updateTotal();

    //actualizamos el localStorage
    this.setLocalStorage();
  }





  /**
   * Elimina todas las unidades de este producto del carro.
   * @param product Product
   */
  removeProduct(product: Product): void {

    //buscamos un prod
    for (let [index, p] of this.cart.productQty.entries()) {

      //si lo encontramos
      if (p.product.id === product.id) {

        //actualizamos la cantidad de productos en el carro
        this.cartItemCount.next(this.cartItemCount.value - p.qty);

        //lo quitamos
        this.cart.productQty.splice(index, 1);
      }
    }

    //actualizamos el total
    this.updateTotal();

    //actualizamos el localStorage
    this.setLocalStorage();
  }


  

  //vaciamos el carro
  emptyCart():void {
    
    //vaciamos el carro
    this.cart.productQty = [];

    //vaciamos la cuenta de articulos
    this.cartItemCount.next(0);

    //quitamos todo del local storage
    localStorage.removeItem("cart");
  }


  //Actualizamos el total
  private updateTotal(): void{
    this.cart.total = this.cart.productQty.reduce( (resultado, elemento) => resultado + elemento.qty * elemento.product.price, 0);
  }

  //actualizamos la cantidad de productos en el carro
  private updateItemsCount(): void{
    this.cartItemCount.next(this.cart.productQty.reduce( (resultado, elemento) => resultado + elemento.qty, 0));
  }

  //metemos el carro en el local storage
  private setLocalStorage(): void{
    localStorage.setItem("cart", JSON.stringify(this.cart));
    localStorage.setItem("cartItemCount", this.cartItemCount.value.toString());
  }

  //recogemos el carro del local storage
  private getCartLocalStorage(): Cart{
    return JSON.parse(localStorage.getItem("cart"));
  }

  //recogemos la cantidad de articulos en el carro del storage
  private getCartItemCountLocalStorage(): number {
    return +localStorage.getItem("cartItemCount");
  }
}

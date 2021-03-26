import { Address } from '../models/address.model';
import { User } from './../models/user.model';
import { Cart } from './../models/cart.model';
import { Order } from './../models/order.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private order: Order;

  constructor() { }

  getOrder(){
    return this.order;
  }

  setCart( cart: Cart ){
    this.order.cart = cart;
  }

  setUser( user: User ){
    this.order.user = user;
  }

  setAddress( address: Address ){
    this.order.address = address;
  }

  payment_method( payment: number ){
    this.order.payment_method = payment;
  }

}

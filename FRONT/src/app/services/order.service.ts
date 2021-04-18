import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cart } from './../models/cart.model';
import { Address } from '../models/address.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url: string   = 'http://localhost:3000/';
  private route: string = 'api/order';


  address: Address;
  address_id: number;


  constructor( private http: HttpClient ) { }

  getOrders(){
    return this.http.get(`${this.url}${this.route}`);
  }
  
  store( address_id: number, cart: Cart){  

    const headers = new HttpHeaders({
      'auth-token': localStorage.getItem('auth-token'),
      'token-expire': localStorage.getItem('token-expire')
    });

    return this.http.post(`${this.url}${this.route}`, {address_id, cart}, {headers: headers});
  }

  getOrdersByUser( user_id: number ){

    const headers = new HttpHeaders({
      'auth-token': localStorage.getItem('auth-token'),
      'token-expire': localStorage.getItem('token-expire')
    });

    return this.http.get(`${this.url}${this.route}/user/${user_id}`, {headers: headers});
  }



}

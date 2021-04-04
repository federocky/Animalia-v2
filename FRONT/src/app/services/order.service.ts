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
  
  store( address_id: number, cart: Cart){  

    const headers = new HttpHeaders({
      'auth-token': localStorage.getItem('auth-token')
    });

    return this.http.post(`${this.url}${this.route}`, {address_id, cart}, {headers: headers});
  }




  //FIXME: creo que no estoy usando esto en ningun lado. No deberia asi que borralo.
/*   setAddress( address: Address ){
    this.address = address;
  }

  getAddress(): Address{
    return this.address;
  } */



}

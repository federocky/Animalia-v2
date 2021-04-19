import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '../models/address.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string   = 'http://localhost:3000/';
  private route: string = 'api/user';

  constructor( private http: HttpClient ) { }

  //devuelve los usuarios con sus direcciones
  getUsers(){
    return this.http.get(`${this.url}${this.route}`);
  }

  //devuelve un usuario con sus direcciones.
  getUser( id: number ){
    return this.http.get(`${this.url}${this.route}/${id}`);
  }


  updateUser( user: User ){
    const headers = new HttpHeaders({
      'auth-token': localStorage.getItem('auth-token'),
      'token-expire': localStorage.getItem('token-expire')
    });

    return this.http.put(`${this.url}${this.route}/${user.id}`, user, {headers: headers});
  }


  deleteUser( id: number ){

    const headers = new HttpHeaders({
      'auth-token': localStorage.getItem('auth-token'),
      'token-expire': localStorage.getItem('token-expire')
    });

    return this.http.delete(`${this.url}${this.route}/${id}`, {headers: headers});
  }


  getAddress( id: number ){

    const headers = new HttpHeaders({
      'auth-token': localStorage.getItem('auth-token'),
      'token-expire': localStorage.getItem('token-expire')
    });

    return this.http.get(`${this.url}${this.route}/address/${id}`, {headers: headers});
  }

  setAddress( address: Address){

    const headers = new HttpHeaders({
      'auth-token': localStorage.getItem('auth-token'),
      'token-expire': localStorage.getItem('token-expire')
    });

    return this.http.post(`${this.url}${this.route}/address/`, address, {headers: headers});
  }

  updateAddress( address: Address ){

    const headers = new HttpHeaders({
      'auth-token': localStorage.getItem('auth-token'),
      'token-expire': localStorage.getItem('token-expire')
    });

    return this.http.put(`${this.url}${this.route}/address/${address.id}`, address, {headers: headers});
  }

  setAddressAsMain( address_id ){

    const headers = new HttpHeaders({
      'auth-token': localStorage.getItem('auth-token'),
      'token-expire': localStorage.getItem('token-expire')
    });

    return this.http.post(`${this.url}${this.route}/address/${address_id}`, {address_id}, {headers: headers});
  }

  deleteAddress( address_id: number){

    const headers = new HttpHeaders({
      'auth-token': localStorage.getItem('auth-token'),
      'token-expire': localStorage.getItem('token-expire')
    });

    return this.http.delete(`${this.url}${this.route}/address/${address_id}`, {headers: headers});
  }



}

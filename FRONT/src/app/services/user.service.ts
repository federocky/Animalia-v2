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

  updateUser( user: User ){

    const headers = new HttpHeaders({
      'auth-token': localStorage.getItem('auth-token'),
      'token-expire': localStorage.getItem('token-expire')
    });

    return this.http.put(`${this.url}${this.route}/${user.id}`, user, {headers: headers});
  }
}

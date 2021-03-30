import { HttpClient } from '@angular/common/http';
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
    return this.http.get(`${this.url}${this.route}/address/${id}`);
  }

  setAddress( id: number, address: Address){
    return this.http.put(`${this.url}${this.route}/address/${id}`, address);
  }

  updateUser( user: User ){
    return this.http.put(`${this.url}${this.route}/${user.id}`, user);
  }
}

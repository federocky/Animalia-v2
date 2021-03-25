import { User } from './../../../../BACK/server/src/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string   = 'http://localhost:3000/';
  private route: string = 'api/auth';

  constructor(private http: HttpClient) { }

  signUp( user: User ){
    return this.http.post(`${this.url}${this.route}/signup`, user);
  }

  signIn( email: string, password: String){
    return this.http.post(`${this.url}${this.route}/signin`, {email, password});
  }


}

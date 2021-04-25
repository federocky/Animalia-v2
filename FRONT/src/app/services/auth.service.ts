import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string   = 'http://localhost:3000/';
  private route: string = 'api/auth';

  userToken: string;

  private signedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);


  //Se comprueba si se esta logado al entrar en la página
  constructor(private http: HttpClient) { 
    this.leerToken();
  }

  /** dice si el usuario esta logado, sin seguridad pero con comunicacion entre componentes*/
  getSignedIn(){
    return this.signedIn;
  }


  /**Registra usuario */
  signUp( user: User ){
    user.active = true;
    return this.http.post(`${this.url}${this.route}/signup`, user);
  }





  /**Login de usuario */
  signIn( email: string, password: String){
    return this.http.post(`${this.url}${this.route}/signin`, {email, password})
      .pipe(
        map ( (res: any) => {
          //guardamos el token
          this.guardarToken( res['token'] );
          this.signedIn.next(true);
          localStorage.setItem('user', JSON.stringify(res.data));
          return res;
        })
      );
  }


  


  logOut(){
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user');
    this.signedIn.next(false);
    this.userToken = '';
  }





  /**Guarda el token y el momento en el que expira en el local storage */
  private guardarToken( idToken: string ) {
    this.userToken = idToken;
    localStorage.setItem('auth-token', idToken);

    //coge la fecha actual
    let hoy = new Date();

    //momento en el que caduca el token
    hoy.setSeconds( 60*60*24 );

    localStorage.setItem('token-expire', hoy.getTime().toString());
  }





  /**Recupera el token del local storage en caso de existir */
  private leerToken(){

    if( localStorage.getItem('auth-token') ){
      this.userToken = localStorage.getItem('auth-token');
      this.signedIn.next(true);
    } else {
      this.userToken = '';
      this.signedIn.next(false);
    }

  }



  /**Comprobanmos si el usuario esta logado, esto es, si tenemos token y si este sigue siendo válido */
  loggedIn(): boolean {

    ///no hay token
    if(this.userToken.length < 2 ) {
      return false;
    }

    //nos traemos el momento en el que expira
    const expira = Number(localStorage.getItem('token-expire'));
    const expiraDate = new Date();
    //ese tiempo del local storage lo 'convertimos en fecha'
    expiraDate.setTime(expira);

    //comparamos esa fecha con la actual y resolvemos.
    if( expiraDate > new Date() ){
      return true
    }
    return false;
  }

}

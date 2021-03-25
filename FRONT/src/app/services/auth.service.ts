import { User } from './../../../../BACK/server/src/models/user.model';
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

  private SignedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);


  //Se comprueba si se esta logado al entrar en la página
  constructor(private http: HttpClient) { 
    this.leerToken();
  }

  /** dice si el usuario esta logado, sin seguridad pero con comunicacion entre componentes*/
  getSignedIn(){
    return this.SignedIn;
  }


  /**Registra usuario */
  signUp( user: User ){
    return this.http.post(`${this.url}${this.route}/signup`, user);
  }



  /**Login de usuario */
  signIn( email: string, password: String){
    return this.http.post(`${this.url}${this.route}/signin`, {email, password})
      .pipe(
        map ( res => {
          //guardamos el token
          this.guardarToken( res['token'] );
          this.SignedIn.next(true);
          return res;
        })
      );
  }


  
  logOut(){
    localStorage.removeItem('auth-token');
    this.SignedIn.next(false);
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
      this.SignedIn.next(true);
    } else {
      this.userToken = '';
      this.SignedIn.next(false);
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

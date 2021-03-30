import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url: string   = 'http://localhost:3000/';
  private route: string = 'api/products';

  constructor( private http: HttpClient ) { 

  }

  getProducts(){
    return this.http.get(`${this.url}${this.route}`);
  }


  getProduct( id: number ): Observable<any>{
    return this.http.get(`${this.url}${this.route}/${id}`);
  }

}

import { Product } from './../../../../BACK/server/src/models/product.model';
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

  setNewProduct( product: Product ){
    return this.http.post(`${this.url}${this.route}`, product);
  }

  updateProduct( product: Product ){
    return this.http.put(`${this.url}${this.route}/${product.id}`, product);
  }

  deleteProduct( id: number ){
    return this.http.delete(`${this.url}${this.route}/${id}`);
  }

  recoverProduct( id: number ){
    return this.http.get(`${this.url}${this.route}/recover/${id}`);
  }

  getCategories(){
    return this.http.get(`${this.url}${this.route}/category/index`);
  }

  getProviders(){
    return this.http.get(`${this.url}${this.route}/provider/index`);
  }

}

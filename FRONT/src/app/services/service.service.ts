import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private url: string   = 'http://localhost:3000/';
  private route: string = 'api/service';

  constructor( private http: HttpClient ) { }

  getServices(){
    return this.http.get(`${this.url}${this.route}`);
  }

  getService( id: number ): Observable<any>{
    return this.http.get(`${this.url}${this.route}/${id}`);
  }

  updateProduct( service: Service ){
    return this.http.put(`${this.url}${this.route}/${service.id}`, service);
  }

  deleteService( id: number ){
    return this.http.delete(`${this.url}${this.route}/${id}`);
  }

  recoverService( id: number ){
    return this.http.get(`${this.url}${this.route}/recover/${id}`);
  }
}

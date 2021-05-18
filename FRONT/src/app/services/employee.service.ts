import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private url: string   = 'http://localhost:3000/';
  private route: string = 'api/employee';

  constructor(private http: HttpClient) { }

  //devuelve los empleado 
  getEmployees(){
    return this.http.get(`${this.url}${this.route}`);
  }

  //devuelve un empleado .
  getEmployee( id: number ){
    return this.http.get(`${this.url}${this.route}/${id}`);
  }


  updateEmployee( employee: Employee ){
    const headers = new HttpHeaders({
      'auth-token': localStorage.getItem('auth-token'),
      'token-expire': localStorage.getItem('token-expire')
    });

    return this.http.put(`${this.url}${this.route}/${employee.id}`, employee, {headers: headers});
  }


  deleteEmployee( id: number ){

    const headers = new HttpHeaders({
      'auth-token': localStorage.getItem('auth-token'),
      'token-expire': localStorage.getItem('token-expire')
    });

    return this.http.delete(`${this.url}${this.route}/${id}`, {headers: headers});
  }

  recoverEmployee( id: number ){
    return this.http.get(`${this.url}${this.route}/recover/${id}`);
  }
}

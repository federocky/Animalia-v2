import { Employee } from './../models/employee.model';
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

    const headers = new HttpHeaders({
      'emp-token': localStorage.getItem('emp-token'),
      'token-expire': localStorage.getItem('token-expire')
    });

    return this.http.get(`${this.url}${this.route}`, {headers: headers});
  }

  //devuelve un empleado .
  getEmployee( id: number ){

    const headers = new HttpHeaders({
      'emp-token': localStorage.getItem('emp-token'),
      'token-expire': localStorage.getItem('token-expire')
    });

    return this.http.get(`${this.url}${this.route}/${id}`, {headers: headers});
  }

    //devuelve un empleado en una hora especifica.
 /*    getEmployeeOnCertainDateAndTime( date: string ){

      const headers = new HttpHeaders({
        'emp-token': localStorage.getItem('emp-token'),
        'token-expire': localStorage.getItem('token-expire')
      });

      return this.http.post(`${this.url}${this.route}/byDate`, {date: date}, {headers: headers});
    } */

  updateEmployee( employee: Employee ){

    const headers = new HttpHeaders({
      'emp-token': localStorage.getItem('emp-token'),
      'token-expire': localStorage.getItem('token-expire')
    });

    return this.http.put(`${this.url}${this.route}/${employee.id}`, employee, {headers: headers});
  }


  deleteEmployee( id: number ){

    const headers = new HttpHeaders({
      'emp-token': localStorage.getItem('emp-token'),
      'token-expire': localStorage.getItem('token-expire')
    });

    return this.http.delete(`${this.url}${this.route}/${id}`, {headers: headers});
  }

  recoverEmployee( id: number ){

    const headers = new HttpHeaders({
      'emp-token': localStorage.getItem('emp-token'),
      'token-expire': localStorage.getItem('token-expire')
    });

    return this.http.get(`${this.url}${this.route}/recover/${id}`, {headers: headers});
  }
}

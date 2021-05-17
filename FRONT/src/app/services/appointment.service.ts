import { Observable } from 'rxjs';
import { Appointment } from './../../../../BACK/server/src/models/appointment.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private url: string   = 'http://localhost:3000/';
  private route: string = 'api/appointment';

  constructor( private http: HttpClient ) { }

  getAppointments(){
    return this.http.get(`${this.url}${this.route}`);
  }

  getAppointment( id: number ): Observable<any>{
    return this.http.get(`${this.url}${this.route}/${id}`);
  }

  getAppointmentsByUser(  ){

    const headers = new HttpHeaders({
      'auth-token': localStorage.getItem('auth-token'),
      'token-expire': localStorage.getItem('token-expire')
    });

    return this.http.get(`${this.url}${this.route}/byUser`, {headers});
  }

  getAppointmentsByDate( date: string, service: string ){
    return this.http.post(`${this.url}${this.route}/byDate`, {date: date, service: service});
  }

  setNewAppointment( appointment: Appointment ){
    return this.http.post(`${this.url}${this.route}`, appointment);
  }

  deleteAppointment( id: number ){
    return this.http.delete(`${this.url}${this.route}/${id}`);
  }
}

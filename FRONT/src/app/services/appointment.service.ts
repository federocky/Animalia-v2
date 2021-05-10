import { Observable } from 'rxjs';
import { Appointment } from './../../../../BACK/server/src/models/appointment.model';
import { HttpClient } from '@angular/common/http';
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

  getAppointmentsByUser( id: number ){
    return this.http.get(`${this.url}${this.route}/byUser`);
  }

  getAppointmentsByDate( id: number ){
    return this.http.get(`${this.url}${this.route}/byDate`);
  }

  setNewAppointment( appointment: Appointment ){
    return this.http.post(`${this.url}${this.route}`, appointment);
  }

  deleteAppointment( id: number ){
    return this.http.delete(`${this.url}${this.route}/${id}`);
  }
}

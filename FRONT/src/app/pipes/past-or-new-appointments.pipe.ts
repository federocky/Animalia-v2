import { Appointment } from './../models/appointment.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pastOrNewAppointments'
})
export class PastOrNewAppointmentsPipe implements PipeTransform {

  /* transform(appointments: Appointment[], order: string): unknown {

    if(!appointments || !order) return appointments;

    const today = new Date(Date.now());

    if(order == 'old') return appointments.filter( appointment => new Date(appointment.date_appointment_from) < today);
    else return appointments.filter( appointment => new Date(appointment.date_appointment_from) >= today);
  } */

  transform(appointments: Appointment[], term: string): unknown {

    if(!appointments || !term) return appointments;

    const today = new Date(Date.now());

    if(term == 'notAsigned') return appointments.filter( appointment => new Date(appointment.date_appointment_from) >= today && !appointment.employee_id);
    else if( term == 'asigned') return appointments.filter( appointment => new Date(appointment.date_appointment_from) >= today && appointment.employee_id);
    else return appointments.filter( appointment => new Date(appointment.date_appointment_from) < today );
  }

}

import { SwalService } from './../../../services/swal.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Appointment } from 'src/app/models/appointment.model';

//sweet alert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pasarela-appointments',
  templateUrl: './pasarela-appointments.component.html',
  styleUrls: ['./pasarela-appointments.component.scss']
})
export class PasarelaAppointmentsComponent implements OnInit {

  appointment: Appointment;

  constructor( private _router: Router,
               private _appointmentService: AppointmentService,
               private _swalService: SwalService
    ) { }

  ngOnInit(): void {
    try {
      this.appointment = JSON.parse(localStorage.getItem('appointment'));
      localStorage.removeItem('appointment');
    } catch (error) {
      this._swalService.showError();
    }
  }


  pay(){

     this._appointmentService.setNewAppointment( this.appointment )
      .subscribe( (res:any)  => {

        Swal.fire({
          icon: 'success',
          title: 'Servicio contratado con éxito',
          html: '<h3 class="text-success">numero de cita '+res.appointment_id+'</h3>',
          allowOutsideClick: false,
          showConfirmButton: true,
        }).then((result) => {
          if(result.isConfirmed) this._router.navigateByUrl('home');
        });

      }, err => {

        console.log(err);

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          html: '<h6 class="text-success">Algo ha ido mal, intentalo mas tarde.</h6>',
          allowOutsideClick: false

        }).then((result) => {

          //TODO: ampliacion, seria mejor saber que producto tiro el error y actualizarlo en el carro.
          this._router.navigateByUrl('tienda');

        });
      });
  }


}

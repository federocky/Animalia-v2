import { Address } from './../../../models/address.model';
import { Appointment } from './../../../models/appointment.model';
import { Component, OnInit } from '@angular/core';

//sweet alert
import Swal from 'sweetalert2';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-user-appointments',
  templateUrl: './user-appointments.component.html',
  styleUrls: ['./user-appointments.component.scss']
})
export class UserAppointmentsComponent implements OnInit {

  appointmentWithAddress: any[] = [];

  constructor( private _appointmentService: AppointmentService ) {  }

  ngOnInit(): void {

    //this.showLoading();

    this.loadAppointmentInfo();

  }


  loadAppointmentInfo( ){

    this._appointmentService.getAppointmentsByUser()
      .subscribe( (res:any) => {
        this.appointmentWithAddress = res.data;
        console.log(this.appointmentWithAddress);
      }, err => {
        console.log(err);
        this.showError();
      })
  }




  showLoading(){
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'
    });
    Swal.showLoading();
  }

  showError(){
    Swal.fire({
      allowOutsideClick: true,
      title: 'Oops...',
      icon: 'warning',
      text: 'Algo ha id mal'
    });
  }

}

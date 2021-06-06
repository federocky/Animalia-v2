import { Appointment } from 'src/app/models/appointment.model';
import { SwalService } from './../../../services/swal.service';
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
  orderTerm: string = 'new';
  haveOld = false;

  constructor( private _appointmentService: AppointmentService,
               private _swalService: SwalService
    ) {  }

  ngOnInit(): void {

    this.loadAppointmentInfo();

  }


  loadAppointmentInfo( ){

    this._appointmentService.getAppointmentsByUser()
      .subscribe( (res:any) => {

        this.appointmentWithAddress = res.data;
        this.checkForOld();

      }, err => {
        console.log(err);
        this._swalService.showError();
      })
  }

  checkForOld(){

    if(this.appointmentWithAddress.length <= 0 ) return false;

    this.appointmentWithAddress.forEach( appointment => {
      if(new Date(appointment.date_appointment_from) < new Date(Date.now())) this.haveOld = true;
    });

    console.log(this.haveOld);
    console.log(new Date(this.appointmentWithAddress[0].date_appointment_from) );
    console.log (new Date(Date.now()));
  }

}

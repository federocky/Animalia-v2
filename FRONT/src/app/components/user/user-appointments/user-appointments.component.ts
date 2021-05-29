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

  appointmentWithAddress: any[];
  orderTerm: string = 'new';

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
        console.log(res);
      }, err => {
        console.log(err);
        this._swalService.showError();
      })
  }

}

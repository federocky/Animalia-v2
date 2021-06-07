import { SwalService } from './../../../../services/swal.service';
import { Employee } from './../../../../models/employee.model';
import { EmployeeService } from './../../../../services/employee.service';
import { Appointment } from './../../../../models/appointment.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

//sweet alert
import Swal from 'sweetalert2';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  appointments: Appointment[] = [];
  term: string;
  employees: Employee[] = [];

  selectedEmployee: number;
  selectedAppointment: Appointment;

  constructor( private _appointmentService: AppointmentService,
               private _employeeService: EmployeeService,
               private _swalService: SwalService
    ) { }

  ngOnInit(): void {
    this.term = 'notAsigned';
    this.loadAppointments();
  }

  loadAppointments(){

    this._swalService.showLoading();

    this._appointmentService.getAppointments()
      .subscribe( (res: any) => {

        this.appointments = res.data;
        this.loadEmployees();

        Swal.close();

        console.log(this.appointments);
      }, err => {

        this._swalService.showError();
      })
  }

  loadEmployees(){
    this._employeeService.getEmployees()
      .subscribe( (res: any) => {
        this.employees = res.data;
        this.loadDates();
      }, err => {
        console.log(err);
      })
  }

  loadDates(){

    const today = new Date();

    this.appointments.forEach( apt => {
      apt.availableEmployee = this.employees;
    });

    let futureAsigned = this.appointments.filter( apt => new Date(apt.date_appointment_from) >= today && apt.employee_id);
    let futureNotAsigned = this.appointments.filter( apt => new Date(apt.date_appointment_from) >= today && !apt.employee_id)


    futureAsigned.forEach( futAsig => {
      futureNotAsigned.forEach( futNotAsi => {

        if(futAsig.date_appointment_from == futNotAsi.date_appointment_from) {
          futNotAsi.availableEmployee = futNotAsi.availableEmployee.filter( emp => emp.id != futAsig.employee_id);
        }
      });
    }) ;

  }

  listEemployees(appointment: Appointment){
    this.employees = appointment.availableEmployee;
    this.selectedAppointment = appointment;
  }


  asignEmployee(){

    if(!this.selectedEmployee) return false;

    this._appointmentService.asignEmployeeToAppointment( this.selectedEmployee, this.selectedAppointment.id )
        .subscribe( (res:any) => {
          Swal.fire('Saved!', '', 'success');
          this.selectedEmployee = 0;
          this.loadAppointments();
        }, err => {
          console.log(err);
          this._swalService.showError();
        })

  }

  cancelEmployeeEncharge( appointment_id: number) {

    this._appointmentService.cancelEmployeeAsigned( appointment_id )
        .subscribe( (res:any) => {
          Swal.fire('Saved!', '', 'success');
          this.loadAppointments();
          console.log(res);
        }, err => {
          console.log(err);
          this._swalService.showError();
        });
  }

}

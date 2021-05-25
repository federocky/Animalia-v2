import { Appointment } from './../../../../models/appointment.model';
import { Order } from './../../../../models/order.model';
import { OrderService } from './../../../../services/order.service';
import { Component, OnInit } from '@angular/core';

//sweet alert
import Swal from 'sweetalert2';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  orders: Order[];
  ordersOrdered: Order[];
  ordersSent: Order[];
  appointments: Appointment[];
  appointmentsNotAssigned: Appointment[];
  appointmentsAssigned: Appointment[];

  constructor(private _orderService: OrderService,
              private _appointmentService: AppointmentService
    ) { }

  ngOnInit(): void {
    this.loadOrders();
    this.loadAppointments();
  }

  loadOrders(){

    this.showLoading();

    this._orderService.getOrders()
      .subscribe( (res: any) => {

        this.orders = res.data;
        this.ordersOrdered = this.orders.filter( order => order.delivery.state == 'ordered');
        this.ordersSent = this.orders.filter( order => order.delivery.state == 'sent');
        Swal.close();

      }, err => {
        this.showError();
      });
  }

  loadAppointments(){

    this.showLoading();

    this._appointmentService.getAppointments()
      .subscribe( (res: any) => {

        this.appointments = res.data;
        this.appointmentsNotAssigned = this.appointments.filter( app => !app.employee_id && new Date(app.date_appointment_from) > new Date(Date.now()));
        this.appointmentsAssigned = this.appointments.filter( app => app.employee_id && new Date(app.date_appointment_from) > new Date(Date.now()));
        console.log(this.appointments);

        Swal.close();
      }, err => {
        this.showError();
      })
  }


  showError(){
    Swal.fire({
      allowOutsideClick: true,
      title: 'Oops...',
      icon: 'warning',
      text: 'Algo ha id mal'
    });
  }

  showLoading(){
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'
    });
    Swal.showLoading();
  }
}

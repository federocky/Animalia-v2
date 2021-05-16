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
               private _appointmentService: AppointmentService
    ) { }

  ngOnInit(): void {
    try {
      this.appointment = JSON.parse(localStorage.getItem('appointment'));
      localStorage.removeItem('appointment');
    } catch (error) {
      this.showError();
    }
  }


  pay(){

    /* this._orderService.store( this.address.id, this.cart)
      .subscribe( (res:any)  => {

        Swal.fire({
          icon: 'success',
          title: 'Pedido realizado con éxito',
          html: '<h3 class="text-success">numero de pedido '+res.order_id+'</h3>',
          allowOutsideClick: false,
          showConfirmButton: true,
        }).then((result) => {
          this.deleteShoppingInfo();
          if(result.isConfirmed) this.router.navigateByUrl('home');
        });

      }, err => {

        console.log(err);

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          html: '<h6 class="text-success">Alguien se te ha adelantado y el stock de alguno de tus productos ha cambiado</h6>',
          allowOutsideClick: false

        }).then((result) => {

          //TODO: seria mejor saber que producto tiro el error y actualizarlo en el carro.
          //Lo dejo como posible mejora.
          this.deleteShoppingInfo();
          this.router.navigateByUrl('tienda');

        });
      }); */
      console.log('pay');
  }


  deleteShoppingInfo(){
   /*  localStorage.removeItem('cart');
    localStorage.removeItem('cartItemCount');
    localStorage.removeItem('address'); */
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

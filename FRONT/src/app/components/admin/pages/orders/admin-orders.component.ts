import { SwalService } from './../../../../services/swal.service';
import { Order } from './../../../../models/order.model';
import { OrderService } from './../../../../services/order.service';
import { Component, OnInit } from '@angular/core';

//sweet alert
import Swal from 'sweetalert2';
import { Variables } from 'src/app/common/utils';

@Component({
  selector: 'app-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {

  orders: Order [] = [];
  term: string;

  //ruta de las imagenes correspodientes a los productos
  imgRoute: string = Variables.imgRouteProducts;

  constructor( private _orderService: OrderService,
              private _swalService: SwalService) { }

  ngOnInit(): void {

    this.term = 'ordered';
    this.loadOrders();
  }

  loadOrders(){

    this._swalService.showLoading();

    this._orderService.getOrders()
      .subscribe( (res: any) => {

        this.orders = res.data;
        Swal.close();

      }, err => {
        this._swalService.showError();
      });
  }

  changeState( id: number, state: string, fordward: boolean ){

    Swal.fire({

      title: '¿Esta seguro que desea cambiar el estado?',
      showConfirmButton: true,
      confirmButtonText: `Continuar`,
      showCancelButton: true,

    }).then((result) => {

      if (result.isConfirmed) {

        if(fordward) this.onChange( id, state );
        else this.onReverse(id, state);

      } else {
        Swal.fire('No has cambiado nada ;)')
      }
    });
  }


  onChange( id: number, state: string ){

    this._orderService.changeDeliveryState( id, state )
    .subscribe( (res: any) => {

      Swal.fire('Saved!', '', 'success');
      this.loadOrders();

    }, err => {
      console.log(err);
    });

  }

  onReverse( id: number, state: string ){

    this._orderService.reverseDeliveryState( id, state )
    .subscribe( (res: any) => {

      Swal.fire('Saved!', '', 'success');
      this.loadOrders();

    }, err => {
      console.log(err);
    });

  }

}

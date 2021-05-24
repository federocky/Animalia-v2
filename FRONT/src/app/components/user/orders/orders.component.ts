import { Router } from '@angular/router';
import { OrderService } from './../../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { Variables } from '../../../common/utils'

//sweet alert
import Swal from 'sweetalert2';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: Order;

  imgRoute: string = Variables.imgRouteProducts;


  constructor( private _orderService: OrderService,
               private _router: Router
    ) { }

  ngOnInit(): void {

    this.showLoading();

    let userId = JSON.parse(localStorage.getItem('user')).id;

    this.loadOrders( userId );

  }

  loadOrders( id: number ){
    this._orderService.getOrdersByUser(id)
    .subscribe( (res:any) => {

      Swal.close();

      this.orders = res.data;
      console.log(this.orders);

    }, err => {
      this.showError();
      console.log(err);
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

  showError(){
    Swal.fire({
      allowOutsideClick: true,
      title: 'Oops...',
      icon: 'warning',
      text: 'Algo ha id mal'
    });
  }


    /**
   * Funcion que nos lleva a ver el detalle del producto.
   * @param id id del producto
   */
     viewProductDetails( id: number ):void {
      this._router.navigate(['tienda', id]);
    }
}

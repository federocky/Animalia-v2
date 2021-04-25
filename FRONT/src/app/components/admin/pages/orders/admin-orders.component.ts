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

  constructor( private _orderService: OrderService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(){

    this._orderService.getOrders()
      .subscribe( (res: any) => {

        this.orders = res.data;
        console.log(this.orders);
      }, err => {
        Swal.fire({
          allowOutsideClick: true,
          title: 'Oops...',
          icon: 'warning',
          text: 'Algo ha ido mal'
        });
      })
  }

}

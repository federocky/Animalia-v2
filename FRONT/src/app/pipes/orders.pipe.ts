import { Order } from './../models/order.model';
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'orderFilter'
})
export class OrdersFilterPipe implements PipeTransform {
    transform(orders: Order[], term: string): Order[] {

        if(!orders || !term) return orders;

        return orders.filter( order => order.delivery.state == term);
    }
}
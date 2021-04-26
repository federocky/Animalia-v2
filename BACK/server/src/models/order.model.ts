import { Delivery } from './delivery.model';
import { Product } from './product.model';

export interface Order {
    id: number;
    user_id: number;
    address_id: number;
    total: number;
    date: Date;

    details:[{
        id: number;
        order_id: number;
        product_id: number;
        qty: number;
        price: number;
        product: Product;
    }]

    delivery: Delivery;
}
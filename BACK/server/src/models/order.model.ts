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

    delivery: {
        id: number;
        order_id: number;
        state: string;
        employee_id_sent: string;
        employee_id_delivered: string;
        date_ordered: string;
        date_sent: string;
        date_delivered: string;
    }
}
import { ProductQty } from './productQty.model';

export interface Cart {
    productQty: ProductQty[];
    total: number;
}
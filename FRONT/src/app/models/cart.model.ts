import { ProductQty } from './product-qty';

export interface Cart {
    productQty: ProductQty[];
    total: number;
}
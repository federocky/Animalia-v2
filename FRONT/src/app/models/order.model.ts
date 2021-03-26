import { Address } from './address.model';
import { User } from './user.model';
import { Cart } from './cart.model';

export interface Order{
    cart: Cart;
    user: User;
    address: Address;
    payment_method: number;
}
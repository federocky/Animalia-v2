import { Address } from './address.model';

export interface User {
    id?: number;
    name: string;
    surname: string;
    email: string;
    phone?: string;
    password: string;
    is_admin?: boolean;
    registered_on?: Date;
    address?: Address;
}
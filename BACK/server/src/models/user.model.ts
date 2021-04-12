import { Address } from './address.model';

export interface User {
    id?: number;
    name: string;
    surname: string;
    phone?: string;
    email: string;
    password: string;
    registered_on?: Date;
    active?: boolean;
    address?: Address | Address[];
}
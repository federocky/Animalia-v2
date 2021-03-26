import { Person } from './person.model';

export interface User extends Person {
    id?: number;
    password: string;
}
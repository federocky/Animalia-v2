export interface Employee {
    id?: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    is_admin: boolean;
    phone: number;
    active?: boolean;
    salary?: number;
    details?: string;
}

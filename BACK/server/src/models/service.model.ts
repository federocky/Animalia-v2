export interface Service {
    id: number;
    name: string;
    description: string;
    hour_start: Date;
    hour_end: Date;
    price: number;
    active: boolean;
}
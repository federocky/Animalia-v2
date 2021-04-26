export interface Delivery {
    id: number;
    order_id: number;
    state: string;
    employee_id_sent: string;
    employee_id_delivered: string;
    date_ordered: string;
    date_sent: string;
    date_delivered: string;
}
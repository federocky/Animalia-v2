export interface Appointment {
    id?: number;
    service_id: number;
    date_appointment_from: Date;
    date_appointment_to: Date;
    user_id: number;
    employee_id?: number;
    price: number;
    address_id: number;
}
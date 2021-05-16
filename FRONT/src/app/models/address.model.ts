export interface Address {
    id?: number;
    street_name: string;
    street_number: string;
    floor?: string;
    letter?: string;
    province: string;
    locality: string;
    town: string;
    postcode: number;
    details?: string;
    active?: boolean;
    main_address?: boolean;
}

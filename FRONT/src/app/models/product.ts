export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    img: string;
    brand: string;
    active: boolean;
    category_id: number;
    provider_id: number;
}
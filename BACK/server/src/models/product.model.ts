export interface Product {
    id?: number;
    name: string;
    description: string;
    price: number;
    img: string;
    brand: string;
    active: boolean;
    category: string;
    category_id: number;
    provider_id: number;
    rating_average: number;
    stock: number;
    number_votes: number;
}
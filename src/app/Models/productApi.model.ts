import { Product } from "./product";

export interface ProductApiResponse{
    data: Product[], 
    current_page:number, 
    next_page:number, 
    prev_page:number, 
    vehicles:any[]
}
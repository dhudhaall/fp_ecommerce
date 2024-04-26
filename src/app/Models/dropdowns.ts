export interface Brand{
    brand_id: number;
    brand: string;
}
export interface Class{
    class_id: number;
    class: string;
}
// export interface Model{
//     modelIds:any;
// }
export interface Body{
    id: string;
    caption: string;
}
export interface Year{
    id: any;
    caption: any;
}
export interface Engine{
    id: string;
    caption: string;
}
export interface Engine_NO{
    id: string;
    caption: string;
}
export interface Country{
    country_id: number;
    currency_id?:number;
    is_selected:number;
    name: string;
}
export interface Currency{
    currency_id: number;
    currency_name: string;
    symbol:string;
    currency_code:string;
}
export interface City{
    city_id: number;
    name: string;
}
export interface State{
    zone_id: number;
    name: string;
}
export interface Language{
    code: string;
    image:string;
    language_id:number;
    name:string;
}

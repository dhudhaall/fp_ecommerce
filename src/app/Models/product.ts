export interface Product{
    alt_part_caption:string
    alternative_products:AlternativeProducts[],
    brand:string,
    category_name:string,
    cross_group:number,
    description:string,
    image:string,
    manufacturer:string
    manufacturer_image:string,
    meta_description:string,
    meta_keyword:string
    name:string,
    oe_numbers:Oe_numbers[],
    offers:Offers[],
    p_sys_loc_name:string,
    parent_assembly:[],
    parent_category_name:string,
    product_id:number | string,
    product_images:[],
    part_type:string,
    product_specifications: ProductSpecifications[],
    specifications:ProductSpecifications[]
    quantity:number | string,
    related_products:RelatedProducts[],
    sub_assembly: [],
    vehicles: Vehicles[],
    in_wishlist:boolean,
    stock_request:stock_request,
    part_no:number | string,
    delivery_msg:string,
    free_shipping_msg:string
}

export interface AlternativeProducts{
    brand:string,
    category_name:string,
    cross_group:number,
    description:string,
    href:string,
    image:string,
    manufacturer:string,
    manufacturer_image:string,
    meta_description:string,
    meta_keyword:string,
    name:string,
    offers:Offers[],
    p_sys_loc_name:string,
    parent_category_name:string,
    product_id:number | string,
    quantity:number | string,
}

export interface Offers{
    offer_code: string,
    days: number | string, 
    qty: number ,
    offer_id:number | string,
    price_id: number | string,
    reliability: number | string,
    price_symbol:string,
    price:number,
    reliability_percent: string,
    in_cart:boolean,
    ordered_qty:number | string,
    acceptance_rate:number | string,
    decline_rate:number | string,
}
export interface Oe_numbers{
    brand_name: string,
    part_number: string,
    product_id: number | string,
}
export interface stock_request{
    message:string,
    stock_notice_type_id: number,
    stock_request_id:number,
}
export interface ProductSpecifications{
    product_id: number | string,
    product_specification_id: number,
    sort:number,
    specification_name:string,
    specification_value:number |string
}
export interface RelatedProducts{
    product_id: number | string,
    brand: string,
    quantity:number |string,
    name:string,
}
export interface Vehicles{
    brand: string,
    brand_id:number |string,
    items:Items[],
    model:string,
    model_id:number,
    class:string,
    sg_veh:number
}

export interface Items{
    attr_others:string,
    body_no:string,
    brand:string,
    brand_id:number,
    class:string,
    class_id:number,
    eng_no:string,
    eng_vol:number | string,
    model:number |string,
    model_id:number |string,
    note:string,
    notes:string,
    placement:string,
    sg_veh:number,
    steering:string,
    veh_type:number,
    years:string

}
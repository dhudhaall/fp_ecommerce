export class LoginModel {
    access_token!:string;
    address_id!:number;
    approved!:number;
    bank_transfer!:number;
    cancelation_notify!:number;
    catalog_pages_per_day!:number;
    cod!:number;
    company!:string;
    company_type!:string;
    compiled_shipping!:number;
    country_id!:number;
    custom_field!:string;
    custom_request_notify!:number;
    customer_group_id!:number;
    customer_id!:number;
    date_added!:string;
    destination_id!:number;
    email!:string;
    fax!:string;
    firstname!:string;
    free_ship_status!:number;
    ip!:string;
    lastname!:string;
    new_email!:string;
    new_order_notify!:boolean;
    newsletter!:boolean;
    order_status_notify!:boolean;
    own_ship!:boolean;
    password_reset_att!:boolean;
    payment_terms!:boolean;
    payment_terms_current_debt!:string;
    payment_terms_max_debt!:string;
    payment_terms_text!:string;
    price_column!:number;
    price_columns!:any[];
    refund_notify!:boolean;
    regional_dealer!:boolean;
    safe!:boolean;
    shipment_discount!:number;
    shipment_method_default!:string;
    status!:boolean;
    store_id!:number;
    telephone!:string;
    wishlist!:any[];
    wishlist_options!:string;

    constructor(login:any) {
        
            this.access_token=login.access_token ||'';
            this.address_id=login.address_id || 0;
            this.approved=login.approved || 0;
            this.bank_transfer=login.bank_transfer || 0;
            this.cancelation_notify=login.cancelation_notify || 0;
            this.catalog_pages_per_day=login.catalog_pages_per_day || 0;
            this.cod=login.cod || 0;
            this.company=login.company||"";
            this.company_type=login.company_type||"";
            this.compiled_shipping=login.compiled_shipping||0;
            this.country_id=login.country_id||0;
            this.custom_field=login.custom_field||"";
            this.custom_request_notify=login.custom_request_notify||0;
            this.customer_group_id=login.customer_group_id||0;
            this.customer_id=login.customer_id||0;
            this.date_added=login.date_added||"";
            this.destination_id=login.destination_id||0;
            this.email=login.email||"";
            this.fax=login.fax||"";
            this.firstname=login.firstname||"";
            this.free_ship_status=login.free_ship_status||0;
            this.ip=login.ip||"";
            this.lastname=login.lastname||"";
            this.new_email=login.new_email||"";
            this.new_order_notify=login.new_order_notify|| false;
            this.newsletter=login.newsletter||false;
            this.order_status_notify=login.order_status_notify||false;
            this.own_ship=login.own_ship||false;
            this.password_reset_att=login.password_reset_att||false;
            this.payment_terms=login.payment_terms||false;
            this.payment_terms_current_debt=login.payment_terms_current_debt||"";
            this.payment_terms_max_debt=login.payment_terms_max_debt||"";
            this.payment_terms_text=login.payment_terms_text||"";
            this.price_column=login.price_column||0;
            this.price_columns=login.price_columns||[];
            this.refund_notify=login.refund_notify||false;
            this.regional_dealer=login.regional_dealer||false;
            this.safe=login.safe||false;
            this.shipment_discount=login.shipment_discount||0;
            this.shipment_method_default=login.shipment_method_default||"";
            this.status=login.status|| false;
            this.store_id=login.store_id|| 0;
            this.telephone=login.telephone|| "";
            this.wishlist=login.wishlist || [];
            this.wishlist_options=login.wishlist_options || "";
           
    }
}
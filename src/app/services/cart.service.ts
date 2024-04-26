import axios from "axios";
import { take } from "rxjs";
const environment = {
    mainBaseUrl: 'https://fp-client-api.asakashi.com/api/main',
    baseURL:'https://fp-client-api.asakashi.com/api',
    clientBaseUrl:'https://fp-client-api.asakashi.com/api/client'
};
export function getCartList(data:any){
    return axios.get(environment.mainBaseUrl + '/cart',  { params: data });
}

export function addtoCart(data:any){
    return axios.post(environment.mainBaseUrl + '/cart/add', data);
}
export function updateCart(data:any){
    return axios.post(environment.mainBaseUrl + '/cart/update', data);
}
export function removeCart(data:any){
    return axios.post(environment.mainBaseUrl + '/cart/remove', data);
}
export function clearCart(data:any){
    return axios.post(environment.mainBaseUrl + '/cart/clear', data);
}
export function set_coupon(data:any){
    return axios.post(environment.mainBaseUrl + '/cart/set_coupon', data);
}
export function set_shipping_method(data:any){
    return axios.post(environment.mainBaseUrl + '/cart/set_shipping_method', data);
}

export function getDestinations(){
    return axios.get(environment.clientBaseUrl + '/destinations' );
}
export function getShippingMethods(data:any){
    return axios.post(environment.mainBaseUrl + '/destinations/shipping_methods', data );
}
export function setDestination(data:any){
    return axios.post(environment.baseURL +  `/checkout/set_destination` , data );
}
export function setDefaultDestination(data:any){
    return axios.post(environment.clientBaseUrl + '/destinations/set_default', data );
}
export function updateShippingMethod(data:any){
    return axios.post(environment.mainBaseUrl + '/cart/update_shipping_method', data );
}

export function getPaymentMethods(destination_id:number){
    return axios.get(environment.clientBaseUrl + '/checkout/payment_methods', {params:{destination_id:destination_id}} );
}
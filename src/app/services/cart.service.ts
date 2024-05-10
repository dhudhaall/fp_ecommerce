
import axios from '../util/httpInteceptor';

const mainBaseUrl = process.env.NEXT_PUBLIC_MAIN_BASE_URL;
const baseURL = process.env.NEXT_PUBLIC_MAIN_BASE_URL;
const clientBaseUrl = process.env.NEXT_PUBLIC_MAIN_BASE_URL;
// const environment = {
//     mainBaseUrl: 'https://fp-client-api.asakashi.com/api/main',
//     baseURL:'https://fp-client-api.asakashi.com/api',
//     clientBaseUrl:'https://fp-client-api.asakashi.com/api/client'
// };
export function getCartList(data:any){
    return axios.get(mainBaseUrl + '/cart',  { params: data });
}

export function addtoCart(data:any){
    return axios.post(mainBaseUrl + '/cart/add', data);
}
export function updateCart(data:any){
    return axios.post(mainBaseUrl + '/cart/update', data);
}
export function removeCart(data:any){
    return axios.post(mainBaseUrl + '/cart/remove', data);
}
export function clearCart(data:any){
    return axios.post(mainBaseUrl + '/cart/clear', data);
}
export function set_coupon(data:any){
    return axios.post(mainBaseUrl + '/cart/set_coupon', data);
}
export function set_shipping_method(data:any){
    return axios.post(mainBaseUrl + '/cart/set_shipping_method', data);
}

export function getDestinations(){
    return axios.get(clientBaseUrl + '/destinations' );
}
export function getShippingMethods(data:any){
    return axios.post(mainBaseUrl + '/destinations/shipping_methods', data );
}
export function setDestination(data:any){
    return axios.post(baseURL +  `/checkout/set_destination` , data );
}
export function setDefaultDestination(data:any){
    return axios.post(clientBaseUrl + '/destinations/set_default', data );
}
export function updateShippingMethod(data:any){
    return axios.post(mainBaseUrl + '/cart/update_shipping_method', data );
}

export function getPaymentMethods(destination_id:number){
    return axios.get(clientBaseUrl + '/checkout/payment_methods', {params:{destination_id:destination_id}} );
}
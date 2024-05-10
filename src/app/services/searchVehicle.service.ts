import axios from '../util/httpInteceptor';
const environment = {
    mainBaseUrl: 'https://fp-client-api.asakashi.com/api/main',
    baseURL:'https://fp-client-api.asakashi.com/api',
    clientBaseUrl:'https://fp-client-api.asakashi.com/api/client'
};

export function getProductsList(url:string, data:any){
    return axios.get(environment.mainBaseUrl + url,  { params: data });
}

export function getFiltersList(url:string, data:any){
    return axios.get(environment.mainBaseUrl +url,  { params: data });
}

export function searchByVehicle(data:any){
    return axios.get(environment.baseURL +'/products/vehicle_search',  { params: data });
}

export function searchByVinORChasis(data:any){
    return axios.get(environment.baseURL +'/products/vin_search',  { params: data });
}
export function searchBySize(data:any){
    return axios.get(environment.mainBaseUrl +'/size_search/types',  { params: data });
}
export function productDetails(productId:string){
    return axios.get(environment.mainBaseUrl +`/products/${productId}`);
}
export function getShippingMethods(data:any){
    return axios.post(environment.mainBaseUrl +`/destinations/shipping_methods`, data );
}
export function addToWishList(data:any){
    return axios.post(environment.clientBaseUrl +`/wishlist/add`, data );
}
export function removeFromWishList(data:any){
    return axios.post(environment.clientBaseUrl +`/wishlist/delete`, data );
}
export function submitPartNoToRD(data:any){
    return axios.post(environment.mainBaseUrl +`/products/part_request`, data );
}
export function getVehHelpTypes(){
    return axios.get(environment.mainBaseUrl + "/products/vehicle_help_types");
}
export function submitVehHelpRequest(data:any){
    return axios.post(environment.mainBaseUrl +`/products/vehicle_help`, data );
}
export function productDetailsImages(data:any){
    return axios.get(environment.mainBaseUrl +`/products/update_image`, {params:data});
}
export function StockRequestAdd(data:any){
    return axios.post(environment.clientBaseUrl +`/stock_requests/add`,data);
}
export function StockRequestRemove(data:any){
    return axios.post(environment.clientBaseUrl +`/stock_requests/delete`,data);
}
export function checkVinNo(data:any){
    return axios.get(environment.mainBaseUrl +`/products/vin_check`,{params:data});
}

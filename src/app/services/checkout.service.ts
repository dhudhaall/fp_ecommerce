import axios from '../util/httpInteceptor';

const environment = {
    mainBaseUrl: 'https://fp-client-api.asakashi.com/api/main',
    baseURL:'https://fp-client-api.asakashi.com/api',
    clientBaseUrl:'https://fp-client-api.asakashi.com/api/client'
};
export function checkOut(data:any){
    return axios.post(environment.clientBaseUrl + '/checkout/save_experience', data);
}
export function checkOutGetAll(data:any){
    return axios.get(environment.clientBaseUrl + '/checkout', {params:data} );
}

export function checkOutUpdateAll(data:any){
    return axios.post(environment.clientBaseUrl + '/checkout', data );
}

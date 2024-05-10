import axios from '../util/httpInteceptor';
const environment = {
    mainBaseUrl: 'https://fp-client-api.asakashi.com/api/main',
    baseURL:'https://fp-client-api.asakashi.com/api',
    clientBaseUrl:'https://fp-client-api.asakashi.com/api/client'
};

export function getWipers(data:any){
    return axios.get(environment.mainBaseUrl + '/products/wiper_search',  { params: data });
}

export function compareProducts(data:any){
    return axios.get(environment.mainBaseUrl + '/products/compare',  { params: data });
}
export function getLubricant(data:any){
    return axios.get(environment.mainBaseUrl + '/products/lubricants',  { params: data });
}




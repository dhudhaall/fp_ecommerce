import axios from '../util/httpInteceptor';

const environment = {
    mainBaseUrl: 'https://fp-client-api.asakashi.com/api/main'
};
export function getBoschbatteries(data:any){
    return axios.get(environment.mainBaseUrl + '/products/bosch/batteries', {params:data});
}
export function getBoschwipers(data:any){
    return axios.get(environment.mainBaseUrl + '/products/bosch/wipers', {params:data});
}
export function getBoschlightBlub(data:any){
    return axios.get(environment.mainBaseUrl + '/products/bosch/light_bulbs', {params:data});
}
export function getBoschsparkPlugs(data:any){
    return axios.get(environment.mainBaseUrl + '/products/bosch/spark_plugs', {params:data});
}

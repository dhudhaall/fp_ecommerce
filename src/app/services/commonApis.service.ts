import axios from '../util/httpInteceptor';

const environment = {
    mainBaseUrl: 'https://fp-client-api.asakashi.com/api/main',
    baseURL:'https://fp-client-api.asakashi.com/api',
    clientBaseUrl:'https://fp-client-api.asakashi.com/api/client'
};
export function getBannersList(){
    return axios.get(environment.baseURL + '/slideshows');
}
export function getTopBar(){
    const searchParams = new URLSearchParams(document.location.search);
   
    return axios.get(environment.baseURL + '/top_bar', {params:{lang_id:searchParams.get('lang_id'), guest_id:'12892893890'}});
}

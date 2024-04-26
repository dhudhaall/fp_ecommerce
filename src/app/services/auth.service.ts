import axios from "axios";
const environment = {
    clientBaseUrl: 'https://fp-client-api.asakashi.com/api/client'
};

export function userLogin(data:any){
    return axios.post(environment.clientBaseUrl + '/login', data);
}

export function getMeData(){
    return axios.get(environment.clientBaseUrl + '/me');
}

export function registerUser(data:any){
    return axios.post(environment.clientBaseUrl + '/register',data);
}

export function forgetPass(data:any){
    return axios.post(environment.clientBaseUrl + '/forgot_password',data);
}

export function logOut(){
    return axios.post(environment.clientBaseUrl + '/logout');
}
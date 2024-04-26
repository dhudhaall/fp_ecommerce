import axios from "axios";
const environment = {
    mainBaseUrl: 'https://fp-client-api.asakashi.com/api/main',
    baseURL:'https://fp-client-api.asakashi.com/api',
    clientBaseUrl:'https://fp-client-api.asakashi.com/api/client'
};
// import { Pagination } from '../Models/pagination';
   export function getCountriesList(){
        return axios.get(environment.baseURL +'/countries');
    }
   export function getStatesList(data:any){
        return axios.get(environment.mainBaseUrl +'/destinations/select/states',  {params:data});
    }
   export function getCitiesList(data:any){
        return axios.get(environment.mainBaseUrl +'/destinations/select/cities',  {params:data});
    }

   export function getCurrencyList(){
        return axios.get(environment.baseURL +'/currencies');
    }

   export function getLanguageList(){
        return axios.get(environment.baseURL +'/langs');
    }

   export function informationsList(data:any){
   
        return axios.get(environment.baseURL +'/informations',{params:data});
    }

   export function menuList(){
        return axios.get(environment.baseURL +'/informations');
    }

   export function brandsList(data:any){
        return axios.get(environment.baseURL +'/garage/select/brands',  {params:data});
    }

   export function classesList(data:any){

        return axios.get(environment.baseURL +'/garage/select/classes',  {params:data});
    }
   export function modelsList(data:any){    
        return axios.get(environment.baseURL +'/garage/select/models',  {params:data});
    }
   export function yearsList(data:any){
        return axios.get(environment.baseURL +'/garage/select/years',  {params:data});
    }
   export function bodiesList(data:any){
        return axios.get(environment.baseURL +'/garage/select/bodies',  {params:data});
    }
   export function enginesList(data:any){
        return axios.get(environment.baseURL +'/garage/select/engines',  {params:data});
    }
   export function engine_nosList(data:any){
        return axios.get(environment.baseURL +'/garage/select/engine_nos',  {params:data});
    }
   export function vehiclesList(){
        return axios.get(environment.baseURL +'/garage/select/vehicles');
    }
   export function sizeDropDowns(){
        return axios.get(environment.mainBaseUrl +'/products/size_search/types');
    }
   export function sidebarList(data:any){
        return axios.get(environment.baseURL +'/informations/details',{params:data});
    }
   export function getSideBar(data:any){
        return axios.get(environment.baseURL +'/langs/load_page',{params:data});
    }

import { Language } from './../Models/dropdowns';
import axios from "axios";
import { RouteParams } from './queryParams';
import { useDispatch } from 'react-redux';
import { retrieveTranslation } from '../Store/Slice/commonSlices';
const environment = {
    baseURL: 'https://fp-client-api.asakashi.com/api'
};

    export function getTranslation(lang_id:number, page:string){
        return axios.get(environment.baseURL +'/langs/load_page',  {params:{lang_id, page}});
    }

    export function getPageDescription(lang_id:number, slug:string){
        return axios.get(environment.baseURL +'/informations/details',  {params:{lang_id, slug}});
    }

    export function AddQueryParams(){

        const _path =  window.location.pathname;
        

          const lang:Language= JSON.parse(localStorage.getItem('lang')!);
  
                let  urlParam = RouteParams.find(o => o.url === _path)!;

    }

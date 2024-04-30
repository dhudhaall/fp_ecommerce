import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure, setPage } from '../Slice/productSearchSlice';
import {getProductsList } from '../../services/searchVehicle.service';
import { AppThunk } from '../store';
import { useSelector , useDispatch} from 'react-redux';
import { fetchAllCheckoutDataFailure, fetchAllCheckoutDataStart, fetchAllCheckoutDataSuccess } from "../Slice/checkoutSlice";
import { checkOutGetAll } from "../../services/checkout.service";

export const fetchProducts = (data:any): AppThunk => async (dispatch:any) => {
  
  try {
    dispatch(fetchProductsStart());
    // Make the API request
    
    const response = await getProductsList(data.url , data.params);
    
    dispatch(fetchProductsSuccess(response.data));
    dispatch(setPage(response.data['search_result']));
  } catch (error:any) {
    dispatch(fetchProductsFailure(error.message));
  }
};


export const fetchCheckoutAllData = (data:any): AppThunk => async (dispatch:any) => {
 
  try {
    dispatch(fetchAllCheckoutDataStart());
    // Make the API request
    const response = await checkOutGetAll(data);
    
    dispatch(fetchAllCheckoutDataSuccess(response.data));
  } catch (error:any) {
    dispatch(fetchAllCheckoutDataFailure(error.response.data.message));

  }
};


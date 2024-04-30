import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPageDescription, getTranslation } from "../../Lang/lang.service";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import {
  checkOut,
  checkOutGetAll,
  checkOutUpdateAll,
} from "../../services/checkout.service";

const initialState: any = {
  getAllCheckoutData: null,
  loading: false,
  error: null,
  postCheckout: null,
  shipping_code:'',
  destination_id:''
};

// @ts-ignore
const checkoutslice = createSlice({
  name: "checkout",
  initialState: initialState,
  reducers: {
    fetchAllCheckoutDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAllCheckoutDataSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.getAllCheckoutData = action.payload;
    },
    fetchAllCheckoutDataFailure(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action.payload;
    },
    postCheckoutStart(state) {
      state.loading = true;
      state.error = null;
    },
    postCheckoutSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.postCheckout = action.payload;
    },
    postCheckoutFailure(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action.payload;
    },
    setShippingCodeSlice(state, action: PayloadAction<any>) {
      state.shipping_code = action.payload;
    },
    setDestinationIDSlice(state, action: PayloadAction<any>) {
      state.destination_id = action.payload;
    },
  },
});

export const {
  fetchAllCheckoutDataStart,
  fetchAllCheckoutDataSuccess,
  fetchAllCheckoutDataFailure,
  setShippingCodeSlice,
  setDestinationIDSlice
} = checkoutslice.actions;

export default checkoutslice.reducer;

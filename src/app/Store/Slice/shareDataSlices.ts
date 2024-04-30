import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPageDescription, getTranslation } from "../../Lang/lang.service";
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { Country } from '../../Models/dropdowns'


// @ts-ignore
const loadCartSlice = createSlice({
  name: "loadCart",
  initialState: {
    loadCartApi: false,
    currency_id: 0,
    country: {
      name: "Singapore",
      country_id: 188,
      is_selected: 1
    } as Country,
    topBarTranslations:{} as any,
    cartData:{} as any,
    infoData:{} as any,
    countryData:[] as any,
    langData:[] as any,
    currencyData:[] as any
  },
  reducers: {
    loadCart: (state: any, action) => {
      state.loadCartApi = action.payload;
    },
    setCartUpdate: (state: any, action) => {
      state.cartUpdate = action.payload;
    },
    reset: (state: any) => { state.loadCartApi = false },
    setCountry: (state, action) => {
      state.country = action.payload;
    },

    setCurrency: (state, action) => {
      state.currency_id = action.payload;
    },
    setTopBarTranslations: (state, action) => {
      state.topBarTranslations = action.payload;
    },
    setCartData: (state, action) => {
      state.cartData = action.payload;
    },
    setInformationData: (state, action) => {
      state.infoData = action.payload;
    },
    setCountryData: (state, action) => {
      state.countryData = action.payload;
    },
    setLangData: (state, action) => {
      state.langData = action.payload;
    },
    setCurrencyData: (state, action) => {
      state.currencyData = action.payload;
    }

  }
});

// const { actions, reducer } = loadCartSlice
// export const { loadCart , reset} = actions;
// export default reducer;

export const { loadCart, setCountry, setCurrency ,setCartUpdate,setTopBarTranslations,setCartData,setInformationData,setCountryData,setCurrencyData,setLangData} = loadCartSlice.actions;
export default loadCartSlice.reducer;
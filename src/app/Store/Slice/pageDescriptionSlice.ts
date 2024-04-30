import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getPageDescription} from "../../Lang/lang.service";
import type { PayloadAction } from '@reduxjs/toolkit'
 
const initialStatePage = {} as any;

export const retrievePageDescription:any = createAsyncThunk(
  "informations/details",
  async ({lang_id, slug}:any) => {
    const res = await getPageDescription(lang_id, slug);
    return res.data;
  }
);


  // @ts-ignore
const pageDesciptionSlice = createSlice({
    name: "pageDescription",
    initialState:initialStatePage,
    extraReducers: builder =>  {
      builder.addCase(retrievePageDescription.fulfilled, (state:any , action:PayloadAction<any>) => {
        return {...action.payload};
      })
    }
  });
  
  const { reducer } = pageDesciptionSlice;
  export default reducer;
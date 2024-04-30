import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getPageDescription, getTranslation} from "../../Lang/lang.service";
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
const initialState = {} as any;

export const retrieveTranslation:any = createAsyncThunk(
  "lang/load_page",
  async ({lang_id, page}:any) => {
    const res = await getTranslation(lang_id, page);
    return res.data;
  }
);

// @ts-ignore
const translationSlice = createSlice({
    name: "translation",
    initialState,
    extraReducers: builder =>  {
      builder.addCase(retrieveTranslation.fulfilled, (state:any , action:PayloadAction<any>) => {
        return {...action.payload};
      })
    }
  });

const { reducer } = translationSlice;
export default reducer;
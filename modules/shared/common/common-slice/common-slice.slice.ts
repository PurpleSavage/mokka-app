import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CountryEntity } from "../domain/entities/country.entity";

export interface CommonState{
    listCountries:CountryEntity[]
}
const initialState:CommonState={
    listCountries:[]
}

export const commonSlice = createSlice({
  initialState,
  name: 'common',
  reducers: {
    setCountries: (state, action: PayloadAction<CountryEntity[]>) => {
      state.listCountries=action.payload
    },
  }
});
export const {
    setCountries,
} = commonSlice.actions;

export default commonSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AlertModalConfig, TypeErrorAlert } from "./modals-slice-types";



export interface ModalsState{
    alertModal:AlertModalConfig
}
const initialState:ModalsState={
    alertModal:{
        typeError:TypeErrorAlert.TOASTER,
        message:''
    },
   
}

export const modalsSlice=createSlice({
    initialState,
    name:'modals',
    reducers:{
        setConfigAlertModal:(state,action:PayloadAction<AlertModalConfig>)=>{
            state.alertModal=action.payload
        },
       
    }
})
export const {
    setConfigAlertModal
} = modalsSlice.actions;

export default modalsSlice.reducer;
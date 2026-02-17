import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AlertModalConfig} from "./modals-slice-types";



export interface ModalsState{
    alert:AlertModalConfig
}
const initialState:ModalsState={
    alert:{
        title:'',
    
        message:'',
        isVisible:false,
        type:'success'
    },
   
}

export const modalsSlice = createSlice({
  initialState,
  name: 'modals',
  reducers: {
    // Para abrir el modal o disparar el toaster
    setConfigAlertModal: (state, action: PayloadAction<Omit<AlertModalConfig, 'isVisible'>>) => {
      state.alert = {
        ...action.payload,
        isVisible: true, // Forzamos la visibilidad al configurar
      };
    },
  
    closeAlert: (state) => {
      state.alert.isVisible = false;
    },
   
    resetAlert: (state) => {
      state.alert = initialState.alert;
    }
  }
});
export const {
    setConfigAlertModal,
    closeAlert
} = modalsSlice.actions;

export default modalsSlice.reducer;
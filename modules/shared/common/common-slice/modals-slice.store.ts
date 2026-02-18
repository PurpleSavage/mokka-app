import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AlertModalConfig} from "./modals-slice-types";
import { ModalWrapperConfig } from "./modal-wrapper-types";



export interface ModalsState{
    alert:AlertModalConfig,
    modalWrapper:ModalWrapperConfig
}
const initialState:ModalsState={
    alert:{
        title:'',
        message:'',
        isVisible:false,
        type:'success'
    },
    modalWrapper:{
      title:'',
      isVisible:false
    }
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
    openModalWrapper:(state,action:PayloadAction<{title:string}>)=>{
      state.modalWrapper={
        isVisible:true,
        title:action.payload.title
      }
    },
    closeModalWrapper:(state)=>{
      state.modalWrapper={
        title:'',
        isVisible:false
      }
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
    closeAlert,
    openModalWrapper,
    closeModalWrapper
} = modalsSlice.actions;

export default modalsSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AlertModalConfig} from "./modals-slice-types";
import { ModalWrapperConfig } from "./modal-wrapper-types";



export interface ModalsState{
    alert:AlertModalConfig,
    modalWrapper:ModalWrapperConfig,
  
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
      isVisible:false,
      formType: null,
      modalId:null
    }
}

export const modalsSlice = createSlice({
    initialState,
    name: 'modals',
    reducers: {
        setConfigAlertModal: (state, action: PayloadAction<Omit<AlertModalConfig, 'isVisible'>>) => {
            state.alert = { ...action.payload, isVisible: true }
        },
        openModalWrapper: (state, action: PayloadAction<{ title: string, modalId: string, formType?: 'SCENE' | 'SNAPSHOT' | 'INFLUENCER' }>) => {
            state.modalWrapper = {
                isVisible: true,
                title: action.payload.title,
                modalId: action.payload.modalId,
                formType: action.payload.formType ?? null,
            }
        },
        closeModalWrapper: (state) => {
            state.modalWrapper = { title: '', isVisible: false, formType: null, modalId: null }
        },
        closeAlert: (state) => { state.alert.isVisible = false },
        resetAlert: (state) => { state.alert = initialState.alert }
    }
})
export const {
    setConfigAlertModal,
    closeAlert,
    openModalWrapper,
    closeModalWrapper
} = modalsSlice.actions;

export default modalsSlice.reducer;
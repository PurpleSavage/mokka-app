import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TextEntity } from "../domain/entities/text.entity"

export interface TextState{
    textHistory: TextEntity[]
    currentTextData:TextEntity | null
    isOpenModalTextData:boolean
}

const initialState: TextState={
    textHistory:[],
    currentTextData:null ,
    isOpenModalTextData:false
}
export const textSlice=createSlice({
    name:'aitext',
    initialState,
    reducers:{
        setTextsHistory:(state, action: PayloadAction<TextEntity[]>)=>{
            state.textHistory = action.payload
        },
        addText:(state, action: PayloadAction<TextEntity>)=>{
            state.textHistory= [action.payload,...state.textHistory]
        },
        lookTextData:(state, action: PayloadAction<TextEntity>)=>{
            state.currentTextData=action.payload
        },
        deleteDataTextModal:(state)=>{
            state.currentTextData=null
        }
    }
})


export const {setTextsHistory,addText,deleteDataTextModal,lookTextData} = textSlice.actions;

export default textSlice.reducer;
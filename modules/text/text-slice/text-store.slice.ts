import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TextEntity } from "../domain/entities/text.entity"
import { socketTextFailed, socketTextReady } from "@/store-events/notifications-events.event"
import { ResponseDataSocket } from "@/modules/shared/common/application/dtos/responses/socket-response.dto"

export interface TextState{
    textHistory: TextEntity[]
    currentTextData:TextEntity | null
    isOpenModalTextData:boolean
    isGenerating:ResponseDataSocket | null
}

const initialState: TextState={
    textHistory:[],
    currentTextData:null ,
    isOpenModalTextData:false,
    isGenerating:null
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
    },
     extraReducers:(builder)=>{
            builder.addCase(socketTextReady, (state, action) => {
                const entity = action.payload.entity
                if (entity) {
                    state.textHistory = [entity, ...state.textHistory]
                }
                state.isGenerating = null // completed 
            })
            builder.addCase(socketTextFailed, (state) => {
                state.isGenerating = null // failed 
            })
        }
})


export const {setTextsHistory,addText,deleteDataTextModal,lookTextData} = textSlice.actions;

export default textSlice.reducer;
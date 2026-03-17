import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TextEntity } from "../domain/entities/text.entity"
import { socketTextFailed, socketTextReady } from "@/store-events/notifications-events.event"
import { ResponseHttpQueue } from "@/modules/shared/common/application/dtos/responses/response-http-queue.dto"


export interface TextState{
    textHistory: TextEntity[]
    isOpenModalTextData:boolean
    isGenerating:ResponseHttpQueue | null
    textDataToView:TextEntity | null
}

const initialState: TextState={
    textHistory:[],
    isOpenModalTextData:false,
    isGenerating:null,
    textDataToView:null
}
export const textSlice=createSlice({
    name:'aitext',
    initialState,
    reducers:{
        setTextsHistory:(state, action: PayloadAction<TextEntity[]>)=>{
            state.textHistory = action.payload
        },
        lookTextData:(state, action: PayloadAction<TextEntity>)=>{
            state.textDataToView=action.payload
        },
        deleteDataTextModal:(state)=>{
            state.textDataToView=null
        },
        setLoadingText:(state,action:PayloadAction<ResponseHttpQueue>)=>{
            state.isGenerating= action.payload
        }
    },
     extraReducers:(builder)=>{
            builder.addCase(socketTextReady, (state, action) => {
                const entity = action.payload.entity
                if (entity) {
                    const exists = state.textHistory.some(a => a.id === entity.id)
                    if(!exists){
                        state.textHistory = [entity, ...state.textHistory]
                    }
                }
                state.isGenerating = null // completed 
            })
            builder.addCase(socketTextFailed, (state) => {
                state.isGenerating = null // failed 
            })
        }
})


export const {setTextsHistory,
    deleteDataTextModal,
    lookTextData,
    setLoadingText
} = textSlice.actions;

export default textSlice.reducer;
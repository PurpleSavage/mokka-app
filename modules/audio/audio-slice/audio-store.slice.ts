import { ResponseDataSocket } from "@/modules/shared/common/application/dtos/responses/socket-response.dto"
import { AudioEntity } from "../domain/entities/audio.entity"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface AiaudioState{
    audioHistory:AudioEntity[]
    currentAudioData:AudioEntity | null
    isGenerating:ResponseDataSocket<AudioEntity> | null
    audioNotifications:ResponseDataSocket<AudioEntity>[]
}
const initialState:AiaudioState={
    audioHistory:[],
    currentAudioData:null,
    isGenerating:null,
    audioNotifications:[]
}

export const aiaudioSlice=createSlice({
    initialState,
    name:'aiaudio',
    reducers:{
       
        setAudioHistory:(state,action:PayloadAction<AudioEntity[]>)=>{
            state.audioHistory=action.payload
        },
        addAudio:(state, action: PayloadAction<ResponseDataSocket<AudioEntity | undefined> >)=>{
            state.isGenerating=action.payload
            if(action.payload.entity){
                state.audioHistory= [action.payload.entity,...state.audioHistory]
                state.audioNotifications= [action.payload,...state.audioNotifications]
            }
        },
        lookAudioData:(state, action: PayloadAction<AudioEntity>)=>{
            state.currentAudioData=action.payload
        },
        deleteDataAudioModa:(state)=>{
            state.currentAudioData=null
        },
        setLoadingAudio:(state,action:PayloadAction<ResponseDataSocket<AudioEntity | undefined>>)=>{
            state.isGenerating= action.payload
        }
    }
})
export const {
    setAudioHistory,
    addAudio,
    lookAudioData,
    deleteDataAudioModa,
    setLoadingAudio,
} = aiaudioSlice.actions;

export default aiaudioSlice.reducer;
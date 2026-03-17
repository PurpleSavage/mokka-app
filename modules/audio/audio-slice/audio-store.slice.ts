
import { AudioEntity } from "../domain/entities/audio.entity"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { socketAudioFailed, socketAudioReady } from "@/store-events/notifications-events.event"
import { ResponseHttpQueue } from "@/modules/shared/common/application/dtos/responses/response-http-queue.dto"


export interface AiaudioState{
    audioHistory:AudioEntity[]
    currentAudioData:AudioEntity | null
    isGenerating:ResponseHttpQueue | null
    audioNotifications:AudioEntity []
    audiosLastWeek:AudioEntity[]
}
const initialState:AiaudioState={
    audioHistory:[],
    currentAudioData:null,
    isGenerating:null,
    audioNotifications:[],
    audiosLastWeek:[]
}

export const aiaudioSlice=createSlice({
    initialState,
    name:'audio',
    reducers:{
       
        setAudioHistory:(state,action:PayloadAction<AudioEntity[]>)=>{
            state.audioHistory=action.payload
        },
        
        lookAudioData:(state, action: PayloadAction<AudioEntity>)=>{
            state.currentAudioData=action.payload
        },
        deleteDataAudioModa:(state)=>{
            state.currentAudioData=null
        },
        setLoadingAudio:(state,action:PayloadAction<ResponseHttpQueue>)=>{
            state.isGenerating= action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(socketAudioReady, (state, action) => {
            const entity = action.payload.entity
            if (entity) {
                const exists = state.audioHistory.some(a => a.id === entity.id)
                if (!exists) {
                    state.audioHistory = [entity, ...state.audioHistory]
                }
            }
            state.isGenerating = null // completed 
        })
        builder.addCase(socketAudioFailed, (state) => {
            state.isGenerating = null // failed 
        })
    }
})
export const {
    setAudioHistory,
    lookAudioData,
    deleteDataAudioModa,
    setLoadingAudio,
} = aiaudioSlice.actions;

export default aiaudioSlice.reducer;
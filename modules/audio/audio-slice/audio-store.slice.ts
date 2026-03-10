import { ResponseDataSocket } from "@/modules/shared/common/application/dtos/responses/socket-response.dto"
import { AudioEntity } from "../domain/entities/audio.entity"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { socketAudioFailed, socketAudioReady } from "@/store-events/notifications-events.event"

export interface AiaudioState{
    audioHistory:AudioEntity[]
    currentAudioData:AudioEntity | null
    isGenerating:ResponseDataSocket | null
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
    name:'audio',
    reducers:{
       
        setAudioHistory:(state,action:PayloadAction<AudioEntity[]>)=>{
            state.audioHistory=action.payload
        },
        addAudio:(state, action: PayloadAction<ResponseDataSocket >)=>{
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
        setLoadingAudio:(state,action:PayloadAction<ResponseDataSocket>)=>{
            state.isGenerating= action.payload
        }
    },
        extraReducers:(builder)=>{
            builder.addCase(socketAudioReady, (state, action) => {
                const entity = action.payload.entity
                if (entity) {
                    state.audioHistory= [entity, ...state.audioHistory]
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
    addAudio,
    lookAudioData,
    deleteDataAudioModa,
    setLoadingAudio,
} = aiaudioSlice.actions;

export default aiaudioSlice.reducer;
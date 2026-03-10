import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VideoEntity } from "../domain/entities/video.entity";
import { ResponseDataSocket } from "@/modules/shared/common/application/dtos/responses/socket-response.dto";
import { socketVideoFailed, socketVideoReady } from "@/store-events/notifications-events.event";

export interface VideoState{
    historyVideos:VideoEntity[],
    isGenerating: ResponseDataSocket | null;
    lastVideos:VideoEntity[]

}
const initialState:VideoState={
    historyVideos:[],
    isGenerating: null,
    lastVideos: [],
}
export const videoSlice=createSlice({
    initialState,
    name:'videos',
    reducers:{
        setHistoryVideos:(state,action:PayloadAction<VideoEntity[]>)=>{
            state.historyVideos=action.payload
        },
        addVideo:(state,action: PayloadAction<ResponseDataSocket<VideoEntity >>)=>{
            if(action.payload.entity){
                state.historyVideos=[action.payload.entity,...state.historyVideos]
                state.lastVideos=[action.payload.entity,...state.lastVideos]
            }  
        },
        setLoadingVideo:(state,action:PayloadAction<ResponseDataSocket >)=>{
            state.isGenerating= action.payload
        },
        setLastVideos:(state,action:PayloadAction<VideoEntity[]>)=>{
            state.lastVideos=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(socketVideoReady, (state, action) => {
            const entity = action.payload.entity
            if (entity) {
                state.historyVideos = [entity, ...state.historyVideos]
                state.lastVideos = [entity,...state.lastVideos]
            }
            state.isGenerating = null // completed 
        })
        builder.addCase(socketVideoFailed, (state) => {
            state.isGenerating = null // failed ✅
        })
    }
})
export const {
    setHistoryVideos,
    addVideo,
    setLoadingVideo,
    setLastVideos
} = videoSlice.actions;

export default videoSlice.reducer;
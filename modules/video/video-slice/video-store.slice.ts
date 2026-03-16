import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VideoEntity } from "../domain/entities/video.entity";

import { socketVideoFailed, socketVideoReady } from "@/store-events/notifications-events.event";
import { ResponseHttpQueue } from "@/modules/shared/common/application/dtos/responses/response-http-queue.dto";

export interface VideoState{
    historyVideos:VideoEntity[],
    isGenerating: ResponseHttpQueue | null;
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
        
        setLoadingVideo:(state,action:PayloadAction<ResponseHttpQueue>)=>{
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
    setLoadingVideo,
    setLastVideos
} = videoSlice.actions;

export default videoSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VideoEntity } from "../domain/entities/video.entity";

export interface VideoState{
    historyVideos:VideoEntity[],

}
const initialState:VideoState={
    historyVideos:[],
}
export const videoSlice=createSlice({
    initialState,
    name:'videos',
    reducers:{
        setHistoryVideos:(state,action:PayloadAction<VideoEntity[]>)=>{
            state.historyVideos=action.payload
        },
        addVideo:(state,action:PayloadAction<VideoEntity>)=>{
            state.historyVideos=[action.payload,...state.historyVideos]
        }
    }
})
export const {
   setHistoryVideos,
    addVideo
} = videoSlice.actions;

export default videoSlice.reducer;
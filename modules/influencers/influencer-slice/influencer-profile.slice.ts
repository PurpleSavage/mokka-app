import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InfluencerSnapshotEntity } from "../domain/entities/influencer-snapshot.entity";
import { InfluencerSceneEntity } from "../domain/entities/influencer-scene.entity";
import { ResponseHttpQueue } from "@/modules/shared/common/application/dtos/responses/response-http-queue.dto";
import { InfluencerEntity } from "../domain/entities/influencer.entity";
import { socketInfluencerSceneFailed, socketInfluencerSceneReady, socketInfluencerSnapshotFailed, socketInfluencerSnapshotReady } from "@/store-events/notifications-events.event";

export interface InfluencerProfileState{
    snapshotsHistoryByInfluencer:InfluencerSnapshotEntity[],
    scenesHistoryByInfluencer:InfluencerSceneEntity[],
    isGeneratingInfluencerSnapshot: ResponseHttpQueue | null;
    isGeneratingInfluencerScene: ResponseHttpQueue | null;
    influencerSelected:InfluencerEntity | null
}
const initialState:InfluencerProfileState={
    snapshotsHistoryByInfluencer:[],
    scenesHistoryByInfluencer:[],
    isGeneratingInfluencerScene:null,
    isGeneratingInfluencerSnapshot:null,
    influencerSelected:null
}
export const influencerProfileSlice=createSlice({
    initialState,
    name:'influencer-profile',
    reducers:{
        
        setInfoCurrentInfluencer:(state,action:PayloadAction<InfluencerEntity>)=>{
            state.influencerSelected=action.payload
        },
        setSnapshotsByInfluencer:(state,action:PayloadAction<InfluencerSnapshotEntity[]>)=>{
            state.snapshotsHistoryByInfluencer=action.payload
        },
        setScenesByInFluencer:(state,action:PayloadAction<InfluencerSceneEntity[]>)=>{
            state.scenesHistoryByInfluencer=action.payload
        }
    },
    extraReducers:(builder)=>{
            
            builder.addCase(socketInfluencerSnapshotReady,(state, action)=>{
                const entity = action.payload.entity
                if (entity) {
                    state.snapshotsHistoryByInfluencer= [entity, ...state.snapshotsHistoryByInfluencer]
                }
                state.isGeneratingInfluencerSnapshot = null
            })
            builder.addCase(socketInfluencerSceneReady,(state, action)=>{
                const entity = action.payload.entity
                if (entity) {
                    state.scenesHistoryByInfluencer= [entity, ...state.scenesHistoryByInfluencer]
                }
                state.isGeneratingInfluencerScene = null
            })

            builder.addCase(socketInfluencerSnapshotFailed, (state) => {
                state.isGeneratingInfluencerSnapshot = null // failed 
            })
            builder.addCase(socketInfluencerSceneFailed, (state) => {
                state.isGeneratingInfluencerScene = null // failed 
            })
    }
})
export const {
   setInfoCurrentInfluencer,
   setSnapshotsByInfluencer,
   setScenesByInFluencer     
} = influencerProfileSlice.actions;

export default influencerProfileSlice.reducer;
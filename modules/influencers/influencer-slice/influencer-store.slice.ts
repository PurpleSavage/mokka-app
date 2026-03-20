import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { InfluencerEntity } from "../domain/entities/influencer.entity"
import { InfluencerSnapshotEntity } from "../domain/entities/influencer-snapshot.entity"
import { InfluencerSceneEntity } from "../domain/entities/influencer-scene.entity"
import { socketInfluencerFailed, socketInfluencerReady, socketInfluencerSceneFailed, socketInfluencerSceneReady, socketInfluencerSnapshotFailed, socketInfluencerSnapshotReady } from "@/store-events/notifications-events.event"
import { ResponseHttpQueue } from "@/modules/shared/common/application/dtos/responses/response-http-queue.dto"

export interface InfluencerState{
    influencersCreated:InfluencerEntity[],
    snapshotsLastWeek: InfluencerSnapshotEntity[],
    scenesLastWeek:InfluencerSceneEntity[],
    snapshotsHistory:InfluencerSnapshotEntity[],
    scenesHistory:InfluencerSceneEntity[],
    isGeneratingInfluencer: ResponseHttpQueue | null;
    influencerSelected:InfluencerEntity | null
}
const initialState:InfluencerState={
    influencersCreated:[],
    snapshotsLastWeek:[],
    scenesLastWeek:[],
    snapshotsHistory:[],
    scenesHistory:[],
    isGeneratingInfluencer:null,
    influencerSelected:null
}
export const aiaudioSlice=createSlice({
    initialState,
    name:'influencer',
    reducers:{
        setInfluencers:(state,action:PayloadAction<InfluencerEntity[]>)=>{
            state.influencersCreated=action.payload
        },
        
        setSnapshotsLastWeek:(state,action:PayloadAction<InfluencerSnapshotEntity[]>)=>{
            state.snapshotsLastWeek=action.payload
        },
        setScenesLastWeek:(state,action:PayloadAction<InfluencerSceneEntity[]>)=>{
            state.scenesLastWeek=action.payload
        },
        setSnapshotsHistory:(state,action:PayloadAction<InfluencerSnapshotEntity[]>)=>{
            state.snapshotsHistory=action.payload
        },
        setScenesHistory:(state,action:PayloadAction<InfluencerSceneEntity[]>)=>{
            state.scenesHistory=action.payload
        },
        setLoadingVideo:(state,action:PayloadAction<ResponseHttpQueue>)=>{
            state.isGeneratingInfluencer= action.payload
        },
        setInfoCurrentInfluencer:(state,action:PayloadAction<InfluencerEntity>)=>{
            state.influencerSelected=action.payload
        }
    },
    extraReducers:(builder)=>{
            builder.addCase(socketInfluencerReady, (state, action) => {
                const entity = action.payload.entity
                if (entity) {
                    state.influencersCreated= [entity, ...state.influencersCreated]
                }
                state.isGeneratingInfluencer = null // completed 
            })
            builder.addCase(socketInfluencerSnapshotReady,(state, action)=>{
                const entity = action.payload.entity
                if (entity) {
                    state.snapshotsHistory= [entity, ...state.snapshotsHistory]
                    state.snapshotsHistory= [entity, ...state.snapshotsLastWeek]
                }
                state.isGeneratingInfluencer = null
            })
            builder.addCase(socketInfluencerSceneReady,(state, action)=>{
                const entity = action.payload.entity
                if (entity) {
                    state.scenesHistory= [entity, ...state.scenesHistory]
                    state.scenesLastWeek= [entity, ...state.scenesLastWeek]
                }
                state.isGeneratingInfluencer = null
            })

            builder.addCase(socketInfluencerFailed, (state) => {
                state.isGeneratingInfluencer = null // failed 
            })
            builder.addCase(socketInfluencerSnapshotFailed, (state) => {
                state.isGeneratingInfluencer = null // failed 
            })
            builder.addCase(socketInfluencerSceneFailed, (state) => {
                state.isGeneratingInfluencer = null // failed 
            })
    }
})
export const {
   setInfluencers,
   setSnapshotsLastWeek,
   setScenesLastWeek,
   setSnapshotsHistory,
   setScenesHistory,
   setInfoCurrentInfluencer     
} = aiaudioSlice.actions;

export default aiaudioSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { InfluencerEntity } from "../domain/entities/influencer.entity"
import { InfluencerSnapshotEntity } from "../domain/entities/influencer-snapshot.entity"
import { InfluencerSceneEntity } from "../domain/entities/influencer-scene.entity"

export interface InfluencerState{
    influencersCreated:InfluencerEntity[],
    snapshotsLastWeek: InfluencerSnapshotEntity[],
    scenesLastWeek:InfluencerSceneEntity[],
    snapshotsHistory:InfluencerSnapshotEntity[],
    scenesHistory:InfluencerSceneEntity[]
}
const initialState:InfluencerState={
    influencersCreated:[],
    snapshotsLastWeek:[],
    scenesLastWeek:[],
    snapshotsHistory:[],
    scenesHistory:[]
}
export const aiaudioSlice=createSlice({
    initialState,
    name:'influencer',
    reducers:{
        setInfluencers:(state,action:PayloadAction<InfluencerEntity[]>)=>{
            state.influencersCreated=action.payload
        },
        addInfluencer:(state,action:PayloadAction<InfluencerEntity>)=>{
            state.influencersCreated=[action.payload,...state.influencersCreated]
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
        addNewSnapshot:(state,action:PayloadAction<InfluencerSnapshotEntity>)=>{
            state.snapshotsLastWeek=[action.payload,...state.snapshotsLastWeek]
            state.snapshotsHistory=[action.payload,...state.snapshotsHistory]
        },
        addNewScene:(state,action:PayloadAction<InfluencerSceneEntity>)=>{
            state.scenesLastWeek=[action.payload,...state.scenesLastWeek]
            state.scenesHistory=[action.payload,...state.scenesHistory]
        }
    }
})
export const {
   setInfluencers,
   addInfluencer,
   setSnapshotsLastWeek,
   setScenesLastWeek,
   setSnapshotsHistory,
   setScenesHistory     
} = aiaudioSlice.actions;

export default aiaudioSlice.reducer;
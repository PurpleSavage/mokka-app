import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { InfluencerEntity } from "../domain/entities/influencer.entity"

export interface InfluencerState{
    influencersCreated:InfluencerEntity[]
 
}
const initialState:InfluencerState={
    influencersCreated:[],
  
}
export const aiaudioSlice=createSlice({
    initialState,
    name:'influencer',
    reducers:{
        setInfluencers:(state,action:PayloadAction<InfluencerEntity[]>)=>{
            state.influencersCreated=action.payload
        },  
    }
})
export const {
   setInfluencers,
} = aiaudioSlice.actions;

export default aiaudioSlice.reducer;
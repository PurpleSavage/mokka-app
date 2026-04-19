import { SharedImageEntity } from "@/modules/image/domain/entities/shared-image.entity";
import { createSlice } from "@reduxjs/toolkit"

export interface ImageCommunityState{
    imagesCommunity:SharedImageEntity[]
}
const initialState:ImageCommunityState={
    imagesCommunity:[]
}

export const imageCommunitySlice=createSlice({
    initialState,
    name:'image-community',
    reducers:{
        setImagesCommunity:()=>{

        }
    }
})

export const {
   setImagesCommunity
} = imageCommunitySlice.actions;

export default imageCommunitySlice.reducer;
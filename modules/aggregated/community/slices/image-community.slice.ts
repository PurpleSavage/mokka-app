import { SharedImageEntity } from "@/modules/image/domain/entities/shared-image.entity";
import { ListPaginationDto } from "@/modules/shared/common/application/dtos/responses/list-pagination.dto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ImageCommunityState{
    imagesCommunity:ListPaginationDto<SharedImageEntity[]> | null
}
const initialState:ImageCommunityState={
    imagesCommunity:null
}

export const imageCommunitySlice=createSlice({
    initialState,
    name:'image-community',
    reducers:{
        setImagesCommunity:(state,action:PayloadAction<ListPaginationDto<SharedImageEntity[]>>)=>{
            state.imagesCommunity=action.payload
        }
    }
})

export const {
   setImagesCommunity
} = imageCommunitySlice.actions;

export default imageCommunitySlice.reducer;
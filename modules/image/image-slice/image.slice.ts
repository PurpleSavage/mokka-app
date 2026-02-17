import { ResponseDataSocket } from "@/modules/shared/common/application/dtos/responses/socket-response.dto"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ImageEntity } from "../domain/entities/Image.entity"

export interface ImageState{
    imagesGallery:ImageEntity[]
    currentImageData:ImageEntity | null
    isGenerating:ResponseDataSocket<ImageEntity> | null
}
const initialState:ImageState={
     imagesGallery:[],
    currentImageData:null,
    isGenerating:null
}

export const imageSlice=createSlice({
    initialState,
    name:'aiaudio',
    reducers:{
       setLoadingImage:(state,action:PayloadAction<ResponseDataSocket<ImageEntity | undefined>>)=>{
            state.isGenerating= action.payload
        },
        setGallery:(state,action:PayloadAction<ImageEntity[]>)=>{
            state.imagesGallery=action.payload
        },
        addImage:(state, action: PayloadAction<ResponseDataSocket<ImageEntity >>)=>{
            state.isGenerating=action.payload
            if(action.payload.entity){
                state.imagesGallery= [action.payload.entity,...state.imagesGallery]
            }   
        },
        lookImageData:(state, action: PayloadAction<ImageEntity>)=>{
            state.currentImageData=action.payload
        },
        deleteDataImageModal:(state)=>{
            state.currentImageData=null
        },
        
    }
})
export const {
   setGallery,
   addImage,
   lookImageData,
   deleteDataImageModal,
   setLoadingImage
} = imageSlice.actions;

export default imageSlice.reducer;
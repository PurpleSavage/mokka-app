
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ImageEntity } from "../domain/entities/Image.entity"
import { socketImageFailed, socketImageReady } from "@/store-events/notifications-events.event"
import { ResponseHttpQueue } from "@/modules/shared/common/application/dtos/responses/response-http-queue.dto"

export interface ImageState{
    imagesGallery:ImageEntity[]
    currentImageData:ImageEntity | null
    isGenerating:ResponseHttpQueue | null
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
       setLoadingImage:(state,action:PayloadAction<ResponseHttpQueue>)=>{
            state.isGenerating= action.payload
        },
        setGallery:(state,action:PayloadAction<ImageEntity[]>)=>{
            state.imagesGallery=action.payload
        },
        
        lookImageData:(state, action: PayloadAction<ImageEntity>)=>{
            state.currentImageData=action.payload
        },
        deleteDataImageModal:(state)=>{
            state.currentImageData=null
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(socketImageReady, (state, action) => {
            const entity = action.payload.entity
            if (entity) {
                state.imagesGallery = [entity, ...state.imagesGallery]
            }
            state.isGenerating = null // completed 
        })
        builder.addCase(socketImageFailed, (state) => {
            state.isGenerating = null // failed 
        })
    }
})
export const {
   setGallery,
   lookImageData,
   deleteDataImageModal,
   setLoadingImage
} = imageSlice.actions;

export default imageSlice.reducer;
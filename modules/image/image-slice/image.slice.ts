import { ResponseDataSocket } from "@/modules/shared/common/application/dtos/responses/socket-response.dto"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ImageEntity } from "../domain/entities/Image.entity"
import { socketImageFailed, socketImageReady } from "@/store-events/notifications-events.event"

export interface ImageState{
    imagesGallery:ImageEntity[]
    currentImageData:ImageEntity | null
    isGenerating:ResponseDataSocket | null
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
       setLoadingImage:(state,action:PayloadAction<ResponseDataSocket>)=>{
            state.isGenerating= action.payload
        },
        setGallery:(state,action:PayloadAction<ImageEntity[]>)=>{
            state.imagesGallery=action.payload
        },
        addImage:(state, action: PayloadAction<ResponseDataSocket<ImageEntity >>)=>{
            if(action.payload.entity){
                state.imagesGallery= [action.payload.entity,...state.imagesGallery]
            }   
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
   addImage,
   lookImageData,
   deleteDataImageModal,
   setLoadingImage
} = imageSlice.actions;

export default imageSlice.reducer;
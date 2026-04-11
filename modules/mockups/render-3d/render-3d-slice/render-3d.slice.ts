import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Model3DEntity } from "../domain/entities/model-3d.entity";
import { ConfigMockupLoadedDto } from "../application/dtos/request/config-mockup-loaded.dto";
import { BackgroundMockupEntity } from "../domain/entities/background-mockup.entity";
import { ListPaginationDto } from "@/modules/shared/common/application/dtos/responses/list-pagination.dto";



export interface Render3DState{
    models:ListPaginationDto<Model3DEntity[]> | null,
    modelLoadedInRender:Model3DEntity | null,
    configMockupLoaded: ConfigMockupLoadedDto,
    backgrounds:ListPaginationDto<BackgroundMockupEntity[]> | null
}
const initialState:Render3DState={
    models:null,
    modelLoadedInRender:null,
    configMockupLoaded:{
        currentDecalUrl:'',
        decalFile: null,
        modelId:'',
        backgroundColor:'',
        color:'',
    },
    backgrounds:null
}
export const render3DSlice=createSlice({
    initialState,
    name:'render-3d',
    reducers:{
        setModels:(state,action:PayloadAction<ListPaginationDto<Model3DEntity[]> >)=>{
            state.models=action.payload
            if (!state.modelLoadedInRender && action.payload.data.length > 0) {
                state.modelLoadedInRender = action.payload.data[0] 
                state.configMockupLoaded.modelId=action.payload.data[0].id
            }
        },
        loadModelInRender:(state,action:PayloadAction<Model3DEntity>)=>{
            state.modelLoadedInRender=action.payload
        },
        setCurrentDecalUrl:(state,action:PayloadAction<{decalUrl:string, decalFile:File}>)=>{
            state.configMockupLoaded.currentDecalUrl=action.payload.decalUrl
            state.configMockupLoaded.decalFile=action.payload.decalFile
        },
        setBackgrounds:(state,action:PayloadAction<ListPaginationDto<BackgroundMockupEntity[]>>)=>{
            state.backgrounds=action.payload
        },
        addMorebackgrounds:(state,action:PayloadAction<ListPaginationDto<BackgroundMockupEntity[]>>)=>{
            if (!state.backgrounds) return
            state.backgrounds.data.push(...action.payload.data) 
            state.backgrounds.hasMore = action.payload.hasMore
            state.backgrounds.currentPage = action.payload.currentPage
        }
    },
   
})
export const {
    setModels,  
    loadModelInRender,
    setCurrentDecalUrl,
    setBackgrounds
} = render3DSlice.actions;

export default render3DSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Model3DEntity } from "../domain/entities/model-3d.entity";
import { BackgroundConfig, ConfigMockupLoadedDto } from "../application/dtos/request/config-mockup-loaded.dto";
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
        background:{
           
        },
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
        addMoreModels:(state,action:PayloadAction<ListPaginationDto<Model3DEntity[]>>)=>{
            if (!state.models) return
            const existingIds = new Set(state.models.data.map(m => m.id))
            const newItems = action.payload.data.filter(m => !existingIds.has(m.id))
            state.models.data.push(...newItems)
            state.models.hasMore = action.payload.hasMore
            state.models.currentPage = action.payload.currentPage
        },
        addMorebackgrounds:(state,action:PayloadAction<ListPaginationDto<BackgroundMockupEntity[]>>)=>{
            if (!state.backgrounds) return
            const existingIds = new Set(state.backgrounds.data.map(b => b.id))
            const newItems = action.payload.data.filter(b => !existingIds.has(b.id))
            state.backgrounds.data.push(...newItems)
            state.backgrounds.hasMore = action.payload.hasMore
            state.backgrounds.currentPage = action.payload.currentPage
        },
        setConfigbackground:(state,action:PayloadAction<BackgroundConfig>)=>{
            if(action.payload.color){
                state.configMockupLoaded.background={
                    color:action.payload.color
                }
            }else if(action.payload.gradient){
                state.configMockupLoaded.background={
                    gradient:action.payload.gradient
                }
            }else if(action.payload.image){
                state.configMockupLoaded.background={
                    image:action.payload.image
                }
            }
        }
    },
   
})
export const {
    setModels,  
    loadModelInRender,
    setCurrentDecalUrl,
    setBackgrounds,
    addMorebackgrounds,
    setConfigbackground,
    addMoreModels
} = render3DSlice.actions;

export default render3DSlice.reducer;
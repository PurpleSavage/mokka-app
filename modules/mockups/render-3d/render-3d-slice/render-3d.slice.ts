import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Model3DEntity } from "../domain/entities/model-3d.entity";
import { ConfigMockupLoadedDto } from "../application/dtos/request/config-mockup-loaded.dto";



export interface Render3DState{
    models:Model3DEntity[],
    modelLoadedInRender:Model3DEntity | null,
    configMockupLoaded: ConfigMockupLoadedDto 
}
const initialState:Render3DState={
    models:[],
    modelLoadedInRender:null,
    configMockupLoaded:{
        currentDecalUrl:'',
        decalFile: null,
        modelId:'',
        backgroundColor:'',
        color:'',
    }
}
export const render3DSlice=createSlice({
    initialState,
    name:'render-3d',
    reducers:{
        setModels:(state,action:PayloadAction<Model3DEntity[]>)=>{
            state.models=action.payload
            if (!state.modelLoadedInRender && action.payload.length > 0) {
                state.modelLoadedInRender = action.payload[0] 
                state.configMockupLoaded.modelId=action.payload[0].id
            }
        },
        loadModelInRender:(state,action:PayloadAction<Model3DEntity>)=>{
            state.modelLoadedInRender=action.payload
        },
        setCurrentDecalUrl:(state,action:PayloadAction<{decalUrl:string, decalFile:File}>)=>{
            state.configMockupLoaded.currentDecalUrl=action.payload.decalUrl
            state.configMockupLoaded.decalFile=action.payload.decalFile
        },
       
    },
   
})
export const {
    setModels,  
    loadModelInRender,
    setCurrentDecalUrl,
} = render3DSlice.actions;

export default render3DSlice.reducer;
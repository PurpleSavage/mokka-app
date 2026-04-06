import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Model3DEntity } from "../domain/entities/model-3d.entity";

export interface Render3DState{
    models:Model3DEntity[],
    modelLoadedInRender:Model3DEntity | null,
    currentDecalUrl:string,
}
const initialState:Render3DState={
    models:[],
    modelLoadedInRender:null,
    currentDecalUrl:'',

}
export const render3DSlice=createSlice({
    initialState,
    name:'render-3d',
    reducers:{
        setModels:(state,action:PayloadAction<Model3DEntity[]>)=>{
            state.models=action.payload
            if (!state.modelLoadedInRender && action.payload.length > 0) {
                state.modelLoadedInRender = action.payload[0] 
            }
        },
        loadModelInRender:(state,action:PayloadAction<Model3DEntity>)=>{
            state.modelLoadedInRender=action.payload
        },
        setCurrentDecalUrl:(state,action:PayloadAction<string>)=>{
            state.currentDecalUrl=action.payload
        },
       
    },
   
})
export const {
    setModels,  
    loadModelInRender,
    setCurrentDecalUrl,
} = render3DSlice.actions;

export default render3DSlice.reducer;
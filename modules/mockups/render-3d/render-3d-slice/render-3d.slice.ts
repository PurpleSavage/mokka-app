import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Model3DEntity } from "../domain/entities/model-3d.entity";

export interface Render3DState{
    models:Model3DEntity[],
  
}
const initialState:Render3DState={
    models:[],
 
}
export const render3DSlice=createSlice({
    initialState,
    name:'render-3d',
    reducers:{
        
        setModels:(state,action:PayloadAction<Model3DEntity[]>)=>{
            state.models=action.payload
        },
    },
   
})
export const {
   setModels,  
} = render3DSlice.actions;

export default render3DSlice.reducer;
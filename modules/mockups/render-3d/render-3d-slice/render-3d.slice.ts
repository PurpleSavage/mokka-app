import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Model3DEntity } from "../domain/entities/model-3d.entity";
import { BackgroundConfig, ConfigMockupLoadedDto, EnviromentConfig, LightingConfig, MaterialConfig, PostProcessingConfig } from "../application/dtos/request/config-mockup-loaded.dto";
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
        decalTransformConfig:{
            position:[0,0,0],
            normal:[0,0,1]
        },
        modelId:'',
        background:{},
        color:'',
        editConfig:{
            lighting: {
                ambientIntensity: 60,
                ambientColor: '#ffffff',
                lightX: 3,
                lightY: 5,
                lightZ: 3,
                shadows: true,
            },
            material: {
                roughness: 40,
                metalness: 20,
            },
            environment: {
                environmentMap: 'Studio',
                fogDensity: 0,
                fogColor: '#cccccc',
            },
            postProcessing: {
                bloom: false,
                bloomIntensity: 30,
                vignette: false,
                vignetteStrength: 40,
                toneMapping: 'Linear',
            },
        }
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
        setCurrentDecalUrl:(state,action:PayloadAction<{decalUrl:string}>)=>{
            state.configMockupLoaded.currentDecalUrl=action.payload.decalUrl
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
        },
        setLightingConfig: (state, action: PayloadAction<LightingConfig>) => {
            state.configMockupLoaded.editConfig.lighting = action.payload
        },
        setMaterialConfig: (state, action: PayloadAction<MaterialConfig>) => {
            state.configMockupLoaded.editConfig.material = action.payload
        },
        setEnvironmentConfig: (state, action: PayloadAction<EnviromentConfig>) => {
            state.configMockupLoaded.editConfig.environment = action.payload
        },
        setPostProcessingConfig: (state, action: PayloadAction<PostProcessingConfig>) => {
            state.configMockupLoaded.editConfig.postProcessing = action.payload
        },
        setDecalTransform: (state, action: PayloadAction<{
            position: [number, number, number],
            normal: [number, number, number]
        }>) => {
            state.configMockupLoaded.decalTransformConfig = action.payload
        }
    },
        
})
export const {
    setModels,
    setLightingConfig,
    setMaterialConfig,  
    loadModelInRender,
    setEnvironmentConfig,
    setPostProcessingConfig,
    setCurrentDecalUrl,
    setBackgrounds,
    addMorebackgrounds,
    setConfigbackground,
    addMoreModels,
    setDecalTransform
} = render3DSlice.actions;

export default render3DSlice.reducer;
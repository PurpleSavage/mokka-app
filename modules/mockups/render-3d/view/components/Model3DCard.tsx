'use client'

import { useDispatch, useSelector } from "react-redux"
import { Model3DEntity } from "../../domain/entities/model-3d.entity"
import { loadModelInRender } from "../../render-3d-slice/render-3d.slice"
import { RootState } from "@/store/boundStore"

interface Model3DCardProps{
    model:Model3DEntity
}
export default function Model3DCard({model}:Model3DCardProps) {
    const dispatch = useDispatch()
    const handleSelectModel =(model:Model3DEntity)=>{
        dispatch(loadModelInRender(model))
    }
    const modelLoadedInRender = useSelector((state:RootState)=>state.render3D.modelLoadedInRender)
    return (
        <div 
            className={`rounded-lg cursor-pointer aspect-square overflow-hidden ${
                modelLoadedInRender?.id === model.id ? 'ring-2 ring-pink-800' : ''
            }`}
            onClick={() => handleSelectModel(model)}>
            <img src={model.thumbnailUrl} alt={model.name} className="w-full h-full object-cover rounded-lg" />
        </div>
    )
}
 
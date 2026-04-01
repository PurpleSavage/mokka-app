'se client'

import { useDispatch } from "react-redux"
import { Model3DEntity } from "../../domain/entities/model-3d.entity"
import { loadModelInRender } from "../../render-3d-slice/render-3d.slice"

interface Model3DCardProps{
    model:Model3DEntity
}
export default function Model3DCard({model}:Model3DCardProps) {
    const dispatch = useDispatch()
    const handleSelectModel =(model:Model3DEntity)=>{
        dispatch(loadModelInRender(model))
    }
  return (
    <div className="rounded-lg cursor-pointer" onClick={() => handleSelectModel(model)}>
        <img src={model.thumbnailUrl} alt={model.name} className="w-full h-auto rounded-lg" />
    </div>
  )
}
 
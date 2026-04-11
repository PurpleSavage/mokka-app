'use client'
import Model3DCard from "./Model3DCard"
import { Model3DEntity } from "../../domain/entities/model-3d.entity"
import { ListPaginationDto } from "@/modules/shared/common/application/dtos/responses/list-pagination.dto"

interface ListModelsProps{
  isPending:boolean,
  error:string,
  models: ListPaginationDto<Model3DEntity[]> | null
}
export default function ListModels({isPending,error,models}:ListModelsProps) {

 
  if(isPending){
    return <div>Loading...</div>
  }

  if(error){
    return <div>{error}</div>
  }

  return (
    < >
      {models?.data.map((model) => (
        <Model3DCard key={model.id} model={model} />
      ))}
    </>
  )
}

'use client'

import { render3DDI } from "../../di/render-3d-container.di"
import { useDispatch, useSelector } from "react-redux"
import {  setModels } from "../../render-3d-slice/render-3d.slice"
import { RootState } from "@/store/boundStore"
import Model3DCard from "./Model3DCard"
import { useQuery } from "@/modules/shared/common/view/custom-hooks/useQuery"
import { Model3DEntity } from "../../domain/entities/model-3d.entity"

export default function ListModels() {
  const dispatch = useDispatch()
  const models = useSelector((state:RootState) => state.render3D.models)
 

  const {data,isPending,error}=useQuery<Model3DEntity[]>({
    fn : () => render3DDI.listModels3D(),
    dispatchStoreCache : (data) => dispatch(setModels(data)),
    revalidate : models.length === 0,
    selector:()=>models
  })
 
  if(isPending){
    return <div>Loading...</div>
  }

  if(error){
    return <div>{error}</div>
  }
  
  return (
    < >
      {data?.map((model) => (
        <Model3DCard key={model.id} model={model} />
      ))}
    </>
  )
}

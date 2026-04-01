'use client'

import { useQuery } from "@/modules/shared/common/view/custom-hooks/useQuery"
import { Model3DEntity } from "../../domain/entities/model-3d.entity"
import { render3DDI } from "../../di/render-3d-container.di"
import { useDispatch, useSelector } from "react-redux"
import { loadModelInRender, setModels } from "../../render-3d-slice/render-3d.slice"
import { RootState } from "@/store/boundStore"
import Model3DCard from "./Model3DCard"
import {  useEffect } from "react"

export default function ListModels() {
  const dispatch = useDispatch()
  const models = useSelector((state:RootState)=>state.render3D.models)
  const modelLoadedInRender = useSelector((state:RootState)=>state.render3D.modelLoadedInRender)

  const {error,data,isPending}=useQuery<Model3DEntity[]>({
      fn: () => render3DDI.listModels3D(),
      dispatchStoreCache:(data: Model3DEntity[])=>dispatch(setModels(data)),
      revalidate: models.length === 0,
      selector: () => models,
  })
  useEffect(() => {
    if (data && data.length > 0 && !modelLoadedInRender) {
      dispatch(loadModelInRender(data[0]))
    }
  }, [data, modelLoadedInRender, dispatch])
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

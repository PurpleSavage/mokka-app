'use client'
import Model3DCard from "./Model3DCard"
import { Model3DEntity } from "../../domain/entities/model-3d.entity"
import { ListPaginationDto } from "@/modules/shared/common/application/dtos/responses/list-pagination.dto"
import {useState } from "react"
import { useDispatch } from "react-redux"
import Spin from "@/modules/shared/common/view/components/Spin"
import { sileo } from "sileo"
import { ApiErrorPlatform } from "@/modules/shared/common/infrastructure/errors/api-errors.error"
import { render3DDI } from "../../di/render-3d-container.di"
import { addMoreModels } from "../../render-3d-slice/render-3d.slice"

interface ListModelsProps{
  isPending:boolean,
  error:string,
  models: ListPaginationDto<Model3DEntity[]> | null
}
export default function ListModels({isPending,error,models}:ListModelsProps) {
  const [isPendingMore,setIsPendingMore]=useState(false)
  const dispatch =useDispatch()

  const getMoreModels =async()=>{
    try {
      setIsPendingMore(true)
      const newPage = (models?.currentPage ?? 1) + 1 
      const limit = 6
       const response = await render3DDI.listModels3D(newPage,limit)
       dispatch(addMoreModels(response))
        
    }catch (error) {
      if(error instanceof ApiErrorPlatform){
        sileo.error({
          title:error.errorType,
          description:error.message
        })
      }else{
        sileo.error({
          title:'Unknown error',
          description:'An error occurred while retrieving more backgrounds'
        })
      }
    }finally{
      setIsPendingMore(false)
    }
  }
  
  if(isPending){
    return <div>Loading...</div>
  }

  if(error){
    return <div>{error}</div>
  }

  return (
    <div className="flex-1 min-h-0 overflow-y-auto">
      <div className="grid grid-cols-4 gap-2 ">
        {models?.data.map((model) => (
          <Model3DCard key={model.id} model={model} />
        ))}
      </div>
      {
        models?.hasMore && (
          <div className="p-1 flex items-center justify-center">
            <button 
              type="button"
              onClick={getMoreModels}
              className="px-6 py-1 cursor-pointer bg-pink-800 hover:bg-pink-700 transition-colors rounded-2xl"
            >
              {
                isPendingMore ? 
                <Spin/> 
                :
                'Load more'
              }
            </button>
          </div>
        )
      }
    </div>
    
  )
}

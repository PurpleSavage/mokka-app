import { useQuery } from "@/modules/shared/common/view/custom-hooks/useQuery"
import { render3DDI } from "../../di/render-3d-container.di"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/boundStore"
import { addMorebackgrounds, setBackgrounds, setConfigbackground } from "../../render-3d-slice/render-3d.slice"
import { BackgroundMockupEntity } from "../../domain/entities/background-mockup.entity"
import { ListPaginationDto } from "@/modules/shared/common/application/dtos/responses/list-pagination.dto"
import BackgroundOptionsCasesResponseApi from "./BackgroundOptionsCasesResponseApi"
import { ApiErrorPlatform } from "@/modules/shared/common/infrastructure/errors/api-errors.error"
import { sileo } from "sileo"
import { useState} from "react"
import { colors } from "../const/colors-background"
import { backgroundGradients } from "../const/gradients-background"
import { backgroundGradientBuilder, OrientationGradient} from "../utils/styles/background-gradient-builder"
import Spin from "@/modules/shared/common/view/components/Spin"


export default function BackgroundOptions() {
  const dispatch = useDispatch()
  const backgrounds = useSelector((state:RootState)=>state.render3D.backgrounds)
  const [isPendingMore,setIsPendingMore]=useState(false)
  const {data,isPending,error}=useQuery<ListPaginationDto<BackgroundMockupEntity[]>>({
    fn:()=>render3DDI.listBackgrounds(),
    dispatchStoreCache : (data) => dispatch(setBackgrounds(data)),
    revalidate:backgrounds === null || backgrounds.data.length === 0,
    selector:()=>backgrounds
  })

  const getMoreBackrounds=async()=>{
    try {
      setIsPendingMore(true)
      const newPage = (backgrounds?.currentPage ?? 1) + 1 
      const limit = 6
      const response = await render3DDI.listBackgrounds(newPage,limit)
      dispatch(addMorebackgrounds(response))
     
    } catch (error) {
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
  const selectBackgroundColor=(color:string)=>{
    dispatch(setConfigbackground({
      color:color,
    }))
  }
  const selectBackgroundGradient=(colors:string[])=>{
    dispatch(setConfigbackground({
      gradient:colors
    }))
  }
  return (
    <div className="h-full flex flex-col gap-2 overflow-y-auto">
      
      <div className="space-y-2">
        <p className="text-gray-400 text-sm">Colors</p>
        <div className="grid grid-cols-4 gap-2 w-full">
          {colors.map((color) => (
            <div key={color.value} className="flex flex-col gap-1 items-center">
              <div
                className="w-full aspect-square rounded-md cursor-pointer"
                style={{ backgroundColor: color.value }}
                onClick={()=>selectBackgroundColor(color.value)}
              />
              <span className="text-xs text-center truncate w-full">{color.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-gray-400 text-sm">Colors</p>
        <div className="grid grid-cols-4 gap-2 w-full">
          {backgroundGradients.map((color) => (
            <div key={color.name} className="flex flex-col gap-1 items-center">
              <div
                className="w-full aspect-square rounded-md cursor-pointer"
                style={{ background:backgroundGradientBuilder(color.values, OrientationGradient.TO_RIGHT) }}
                onClick={()=>selectBackgroundGradient(color.values)}
              />
              <span className="text-xs text-center truncate w-full">{color.name}</span>
            </div>
          ))}
        </div>
      </div>
     

      <div className="space-y-2">
        <p className="text-gray-400 text-sm">Background styles</p>
        <BackgroundOptionsCasesResponseApi
          isPending={isPending}
          error={error}
          backgrounds={data}
        />
        {data?.hasMore && (
          <div className="flex items-center justify-center ">
            <button
              onClick={getMoreBackrounds}
              type="button"
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
        )}
      </div>

    </div>
  )
}

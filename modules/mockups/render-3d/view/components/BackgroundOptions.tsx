import { useQuery } from "@/modules/shared/common/view/custom-hooks/useQuery"
import { render3DDI } from "../../di/render-3d-container.di"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/boundStore"
import { setBackgrounds } from "../../render-3d-slice/render-3d.slice"
import { BackgroundMockupEntity } from "../../domain/entities/background-mockup.entity"
import { ListPaginationDto } from "@/modules/shared/common/application/dtos/responses/list-pagination.dto"
import BackgroundOptionsCasesResponseApi from "./BackgroundOptionsCasesResponseApi"

const colors =[
  { name: "White", value: "#ffffff" },
  { name: "Black", value: "#000000" },
  { name: "Gray", value: "#808080" },
  { name: "Red", value: "#ff0000" },
  { name: "Green", value: "#00ff00" },
  { name: "Blue", value: "#0000ff" }  
]

export default function BackgroundOptions() {
  const dispatch = useDispatch()
  const backgrounds = useSelector((state:RootState)=>state.render3D.backgrounds)

  const {data,isPending,error}=useQuery<ListPaginationDto<BackgroundMockupEntity[]>>({
    fn:()=>render3DDI.listBackgrounds(),
    dispatchStoreCache : (data) => dispatch(setBackgrounds(data)),
    revalidate:backgrounds === null || backgrounds.data.length === 0,
    selector:()=>backgrounds
  })
  return (
    <div className=" h-full flex flex-col gap-2">
      <div className="space-y-2">
        <p className="text-gray-400 text-sm">Colors</p>
        <div className="grid grid-cols-4 gap-2 w-full">
          {colors.map((color) => (
            <div key={color.value} className="flex flex-col gap-1 items-center">
              <div 
                className="w-full aspect-square rounded-md cursor-pointer"
                style={{ backgroundColor: color.value }}
              />
              <span className="text-xs text-center truncate w-full">{color.name}</span>
            </div>
          ))} 
        </div>
      </div>
      <div className="space-y-2 flex-1">
        <p className="text-gray-400 text-sm">Background styles</p> 
        <BackgroundOptionsCasesResponseApi 
          isPending={isPending} 
          error={error} 
          backgrounds={data}
        />
      </div>
    </div>
  )
}

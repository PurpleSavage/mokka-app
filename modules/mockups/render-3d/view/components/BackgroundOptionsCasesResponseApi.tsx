'use client'

import { ListPaginationDto } from "@/modules/shared/common/application/dtos/responses/list-pagination.dto"
import { BackgroundMockupEntity } from "../../domain/entities/background-mockup.entity"
import BackgroundSkeletonList from "../skeletons/BackgroundSkeletonList"



interface BackgroundOptionsCasesResponseApiProps{
    backgrounds:ListPaginationDto<BackgroundMockupEntity[]> | null,
    isPending:boolean,
    error:string
}
export default function BackgroundOptionsCasesResponseApi({
    backgrounds,
    isPending,
    error
}:BackgroundOptionsCasesResponseApiProps) {
    console.log(backgrounds)
    if(isPending){
        return (
            <div className="grid grid-cols-4 w-full ">
                <BackgroundSkeletonList size={12}/>
            </div>
        )
    }
    if(error){
        return (
            <div className="flex items-center justify-center">
                <p className="text-center text-red-500">
                    {error}
                </p>
            </div>
        )
    }
    if(backgrounds && backgrounds.data.length===0){
        return (
            <div className="flex items-center justify-center">
                <p className="text-gray-400 text-sm">There are no registered backgrounds</p>
            </div>
        )
    }
    if(backgrounds && backgrounds.data.length>0){
        return (
            <div className="grid grid-cols-4 gap-2 w-full">
                {backgrounds.data.map((background) => (
                    <div key={background.id} className="w-full h-16 overflow-hidden rounded-md cursor-pointer">
                        <img 
                            src={background.backgroundUrl} 
                            className="w-full h-full object-cover" 
                            alt={background.name} 
                        />
                    </div>
                ))}
            </div>
        )
    }
    return null
    
}

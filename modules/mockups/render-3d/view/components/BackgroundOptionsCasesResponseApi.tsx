'use client'

import { ListPaginationDto } from "@/modules/shared/common/application/dtos/responses/list-pagination.dto"
import { BackgroundMockupEntity } from "../../domain/entities/background-mockup.entity"
import BackgroundSkeletonList from "../skeletons/BackgroundSkeletonList"
import BackgroundCard from "./BackgroundCard"



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
                    <BackgroundCard key={background.id} background={background}/>
                ))}
            </div>
        )
    }
    return null
    
}

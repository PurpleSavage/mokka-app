'use client'

import { useInfluencerInfo } from "../custom-hooks/useInfluencerInfo"
import InfluencerSummarySkeleton from "../skeletons/InfluencerSummarySkeleton"
import InfluencerSummary from "./InfluencerSummary"

interface FetcherInfluencerProps{
    id:string
   
}
export default function FetcherInfluencer({id}:FetcherInfluencerProps) {
  const {influencer,isPending,error}=useInfluencerInfo(id)

  if(isPending){
    return <InfluencerSummarySkeleton/>
  }
  if(error){
    return(
      <div className="h-90 flex items-center justify-center">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    )
  }
  if(!influencer){
     return null
  }
  return (
    <>
       <InfluencerSummary influencer={influencer} />
    </>
  )
}

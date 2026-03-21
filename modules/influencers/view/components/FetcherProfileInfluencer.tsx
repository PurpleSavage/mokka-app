'use client'

import { useInfluencerInfo } from "../custom-hooks/useInfluencerInfo"
import InfluencerSummary from "./InfluencerSummary"

interface FetcherInfluencerProps{
    id:string
   
}
export default function FetcherInfluencer({id}:FetcherInfluencerProps) {
  const {influencer,isPending,error}=useInfluencerInfo(id)
  if(!influencer){
      return null
  }
  return (
    <>
       <InfluencerSummary influencer={influencer} />
    </>
  )
}

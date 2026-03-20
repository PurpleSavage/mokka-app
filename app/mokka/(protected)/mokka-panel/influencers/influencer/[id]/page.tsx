'use client'
import { useInfluencerInfo } from "@/modules/influencers/view/custom-hooks/useInfluencerInfo"
import { use } from "react"

export default function InfluencerProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
    const { id } =  use(params)
    console.log('este es el id',id)
    const {isPending}=useInfluencerInfo(id)
    return (
        <div>
            
        </div>
    )
}

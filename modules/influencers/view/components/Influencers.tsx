'use client'

import { useInfluencers } from "../custom-hooks/useInfluencers"
import InfluencersSkeleton from "../skeletons/InfluencersSkeleton";
import InfluencerProfileCard from "./InfluencerProfileCard";

interface InfluencersProps {
    styleSkeleton?:string,
    styleProfileCard?:string
}
export default function Influencers({
    styleSkeleton,
    styleProfileCard
}:InfluencersProps) {
    const {error,influencersCreated,isPending}=useInfluencers()

    if (isPending) {
        return <InfluencersSkeleton size={4} styles={styleSkeleton}/>
    }
    if (error) {
        return (
            <div className="flex justify-center items-center" >
                <p className="text-red-400">{error}</p>
            </div>
        )
    }
    if(influencersCreated.length ===0){
        return (
            <div className="flexjustify-center items-center ">
                <p className="text-slate-400">No influencers were generated </p>
            </div>
        );
    }
  return (
    <>
        {
            influencersCreated.map((influencer)=>(
                <InfluencerProfileCard 
                    key={influencer.id} 
                    influencer={influencer} 
                    className={styleProfileCard} 
                />
            ))
        }
    </>
  )
}

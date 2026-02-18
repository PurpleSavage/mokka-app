'use client'

import { useInfluencers } from "../custom-hooks/useInfluencers"
import InfluencersSkeleton from "../skeletons/InfluencersSkeleton";
import InfluencerProfileCard from "./InfluencerProfileCard";

export default function Influencers() {
    const {error,influencersCreated,isPending}=useInfluencers()

    if (isPending) {
        return <InfluencersSkeleton size={4}/>
    }
    if (error) {
        return <p className="text-gray-400 text-lg font-medium">{error}</p>;
    }
    if(influencersCreated.length ===0){
        return (
            <p className="text-gray-400 text-xl font-medium">
                You haven&apos;t generated any influencers yet
            </p>
        );
    }
  return (
    <>
        {
            influencersCreated.map((influencer)=>(
                <InfluencerProfileCard key={influencer.id} influencer={influencer}/>
            ))
        }
    </>
  )
}

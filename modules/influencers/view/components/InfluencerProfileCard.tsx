"use client";

import { InfluencerEntity } from "../../domain/entities/influencer.entity";

interface InfluencerProfileCardProps {
  influencer: InfluencerEntity;
  className?: string;
}
export default function InfluencerProfileCard({
  influencer, 
  className = "w-52 h-full"
}: InfluencerProfileCardProps) {
  return (
    <div
      className={`
        bg-[#121212] hover:bg-zinc-900 border transition-colors flex
        border-slate-600/50cursor-pointer hover:text-slate-500
        text-white items-center justify-center ${className}`}  
    >
      <img 
        src={influencer.influencerUrlImage} 
        alt="Generated influencer image" 
        className="w-full h-full object-cover"
      />
    </div>
  );
}

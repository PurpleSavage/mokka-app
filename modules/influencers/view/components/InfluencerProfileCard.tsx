"use client";

import { InfluencerEntity } from "../../domain/entities/influencer.entity";

interface InfluencerProfileCardProps {
  influencer: InfluencerEntity;
}
export default function InfluencerProfileCard({
  influencer,
}: InfluencerProfileCardProps) {
  return (
    <div
      className="bg-[#121212] hover:bg-zinc-900 border transition-colors flex
        border-slate-600/50 w-52 h-full cursor-pointer hover:text-slate-500
        text-white items-center justify-center"
    >
      
    </div>
  );
}

"use client";

import { InfluencerEntity } from "../../domain/entities/influencer.entity";

interface InfluencerProfileCardProps {
  influencer: InfluencerEntity;
  className?: string;
  onSelect?: (influencer: InfluencerEntity) => void;
}
export default function InfluencerProfileCard({
  influencer, 
  className = "w-30 h-full",
  onSelect,
}: InfluencerProfileCardProps) {
  return (
    <div
      className={`
        relative overflow-hidden group
        bg-[#121212] border border-slate-600/50
        cursor-pointer ${className}
      `}
    >
      <img
        src={influencer.influencerUrlImage}
        alt="Generated influencer image"
        className="w-full h-full object-cover"
      />
      <div
        className="
          absolute inset-0
          bg-black/55 backdrop-blur-[3px]
          flex items-center justify-center
          opacity-0 group-hover:opacity-100
          transition-opacity duration-200
        "
      >
        <button
          className="
            rounded-lg bg-pink-800 px-4
            cursor-pointer
          "
          onClick={() => onSelect?.(influencer)}
        >
          Select
        </button>
      </div>
    </div>
  );
}

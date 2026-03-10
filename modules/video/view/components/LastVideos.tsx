"use client";

import { RootState } from "@/store/boundStore";
import { useSelector } from "react-redux";
import { useLastVideos } from "../custom-hooks/useLastVideos";
import MultimediaCardSkeleton from "@/modules/shared/common/view/skeletons/MultimediaCardSkeleton";
import VideoCard from "./VideoCard";

export default function LastVideos() {
  const isGenerating = useSelector(
    (state: RootState) => state.video.isGenerating,
  );
  const { isPending, error, lastVideos } = useLastVideos();
  if (isPending) {
    return <MultimediaCardSkeleton size={4} />;
  }
  if(lastVideos.length===0){
      return(
        <div className="flex justify-center items-center p-1 col-span-4">
           <p className="text-slate-400">You didn&apos;t create any videos this past week</p>
        </div>
      )
    }
  if (error) {
    return (
      <div className="flex items-center justify-center p-2">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
  return (
    <>
      {isGenerating?.status==="processing" && (<MultimediaCardSkeleton size={1} />)}
      {lastVideos.map((video) => (
        <div key={video.id} className="col-span-1">
          <VideoCard video={video} />
        </div>
      ))}
    </>
  )
}

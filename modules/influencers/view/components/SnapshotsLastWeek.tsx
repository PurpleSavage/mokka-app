"use client";

import { useSnapshotsLAstWeek } from "../custom-hooks/useSnapshotsLastWeek";
import MultimediaGenerationCard from "./MultimediaGenerationCard";
import MultimediaCardSkeleton from "../skeletons/MultimediaCardSkeleton";

export default function SnapshotsLastWeek() {
  const { error, isPending, snapshotsLastWeek } = useSnapshotsLAstWeek();
  if (isPending) {
    return <MultimediaCardSkeleton size={4}/>
  }
  if (error) {
    return(
      <div className="flex items-center justify-center p-2">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }
  if (snapshotsLastWeek.length === 0) {
    return(
      <div className="flex items-center justify-center p-2">
        <p className="text-slate-400">No scenes were generated last week</p>
      </div>
    )
  }
  return (
    <div className="flex items-center gap-4 w-full">
        {snapshotsLastWeek.map((snapshot) => (
          <MultimediaGenerationCard
            key={snapshot.id}
            multimedia={snapshot}
          />
        ))}
      </div>
  );
}

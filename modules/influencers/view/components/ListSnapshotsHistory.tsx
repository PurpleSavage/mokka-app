"use client";

import { useSnapshotsHistory } from "../custom-hooks/useSnapshotsHistory";
import MultimediaCardSkeleton from "../skeletons/MultimediaCardSkeleton";
import MultimediaGenerationCard from "./MultimediaGenerationCard";

export default function ListSnapshotsHistory() {
  const { isPending, error, snapshotsHistory } = useSnapshotsHistory();
  if (isPending) {
    return <MultimediaCardSkeleton size={8} />;
  }
  if (error) {
    return (
      <div className="flex justify-center items-center col-span-4" >
        <p className="text-red-400">{error}</p>
      </div>
    );
  }
  if (snapshotsHistory.length === 0) {
    return (
      <div className="flex justify-center items-center p-1 col-span-4">
        <p className="text-slate-400">No snapshots were generated </p>
      </div>
    );
  }
  return (
    <>
      {snapshotsHistory.map((scene) => (
          <div key={scene.id} className="break-inside-avoid mb-4">
            <MultimediaGenerationCard multimedia={scene} />
          </div>
        ))}
    </>
  );
}

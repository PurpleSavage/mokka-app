"use client";

import { getRangeByDay } from "@/modules/shared/common/view/utils/get-range-by-day.util";
import { useSnapshotsLAstWeek } from "../custom-hooks/useSnapshotsLastWeek";
import MultimediaGenerationCard from "./MultimediaGenerationCard";

export default function SnapshotsLastWeek() {
  const { error, isPending, snapshotsLastWeek } = useSnapshotsLAstWeek();
  if (isPending) {
    return;
  }
  if (error) {
    return;
  }
  if (snapshotsLastWeek.length === 0) {
    return;
  }
  return (
    <section className="space-y-2">
      <div className="space-y-1">
        <h2 className="text-2xl text-white font-medium">
          Snapshots generated last week
        </h2>
        <p className="text-md text-white">
          Snapshots generated from {getRangeByDay(7)}
        </p>
      </div>
      <div className="flex items-center gap-4 w-full">
        {snapshotsLastWeek.map((snapshot) => (
          <MultimediaGenerationCard
            key={snapshot.id}
            multimedia={snapshot}
          />
        ))}
      </div>
    </section>
  );
}

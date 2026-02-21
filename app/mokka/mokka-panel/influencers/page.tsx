import ListInfluencers from "@/modules/influencers/view/components/ListInfluencers";
import ScenesLastWeek from "@/modules/influencers/view/components/ScenesLastWeek";
import SnapshotsLastWeek from "@/modules/influencers/view/components/SnapshotsLastWeek";
import { getRangeByDay } from "@/modules/shared/common/view/utils/get-range-by-day.util";


export default function InfluencersPage() {
  return (
    <div className="overflow-y-auto custom-scrollbar h-full space-y-4">
        <div className="space-y-1">
            <p className="text-2xl text-white font-medium">Influencers</p>
            <p className="text-slate-300">Manage and create your influencers</p>
        </div>
        <ListInfluencers/>
        <div className="space-y-2">
          <div className="space-y-1">
            <h2 className="text-2xl text-white font-medium">
              Snapshots generated last week
            </h2>
            <p className="text-xs text-white">
              Snapshots generated from {getRangeByDay(7)}
            </p>
          </div>
          <SnapshotsLastWeek/>
        </div>
        <div className="space-y-2">
          <div className="space-y-1">
              <h2 className="text-2xl text-white font-medium">Scenes generated last week</h2>
              <p className="text-xs text-white">Scenes generated from {getRangeByDay(7)}</p>
          </div>
          <ScenesLastWeek/>
        </div>
    </div>
  )
}

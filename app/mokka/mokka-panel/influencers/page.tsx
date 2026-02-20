import ListInfluencers from "@/modules/influencers/view/components/ListInfluencers";
import ScenesLastWeek from "@/modules/influencers/view/components/ScenesLastWeek";
import SnapshotsLastWeek from "@/modules/influencers/view/components/SnapshotsLastWeek";


export default function InfluencersPage() {
  return (
    <>
        <div className="space-y-1">
            <p className="text-2xl text-white font-medium">Influencers</p>
            <p className="text-slate-300">Manage and create your influencers</p>
        </div>
        <ListInfluencers/>
        <SnapshotsLastWeek/>
        <ScenesLastWeek/>
    </>
  )
}

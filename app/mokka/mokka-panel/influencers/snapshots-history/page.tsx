import ListSnapshotsHistory from "@/modules/influencers/view/components/ListSnapshotsHistory";


export default function SnapshotsHistoryPage() {
  return (
    <div className="h-full grid grid-cols-4 gap-4 overflow-y-auto custom-scrollbar">
      <ListSnapshotsHistory/>
    </div>
  )
}

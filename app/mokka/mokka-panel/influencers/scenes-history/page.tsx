import ListScenesHistory from "@/modules/influencers/view/components/ListScenesHistory";


export default function ScenesHistoryPage() {
  return (
    <div className="h-full grid grid-cols-4 gap-4 overflow-y-auto custom-scrollbar">
      <ListScenesHistory/>
    </div>
  )
}

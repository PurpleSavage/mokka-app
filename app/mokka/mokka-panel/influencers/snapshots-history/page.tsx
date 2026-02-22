import ButtonGenerateMultimediaContent, { OriginComponentOptions } from "@/modules/influencers/view/components/ButtonGenerateMultimediaContent";
import ListSnapshotsHistory from "@/modules/influencers/view/components/ListSnapshotsHistory";



export default function SnapshotsHistoryPage() {
  
  return (
    <>
      <ButtonGenerateMultimediaContent 
        text="Create snapshot" 
        originComponent={OriginComponentOptions.snapshot}
      />
      <div className="h-full  grid grid-cols-4 gap-4 overflow-y-auto custom-scrollbar">
        <ListSnapshotsHistory/>
      </div>
    </>
  )
}

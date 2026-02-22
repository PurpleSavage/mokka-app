import ButtonGenerateMultimediaContent, { OriginComponentOptions } from "@/modules/influencers/view/components/ButtonGenerateMultimediaContent";
import ListScenesHistory from "@/modules/influencers/view/components/ListScenesHistory";


export default function ScenesHistoryPage() {
  return (
    <>
      <ButtonGenerateMultimediaContent 
        text="Create snapshot" 
        originComponent={OriginComponentOptions.scene}
      />
      <div className="h-full  grid grid-cols-4 gap-4 overflow-y-auto custom-scrollbar">
        <ListScenesHistory/>
      </div>
    </>
  )
}

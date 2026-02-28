import ButtonGenerateMultimediaContent from "@/modules/influencers/view/components/ButtonGenerateMultimediaContent";
import ListScenesHistory from "@/modules/influencers/view/components/ListScenesHistory";
import { OriginComponentOptions } from "@/modules/influencers/view/ui-types/multimedia-options";


export default function ScenesHistoryPage() {
  return (
    <>
      <ButtonGenerateMultimediaContent 
        text="Create Scene" 
        originComponent={OriginComponentOptions.scene}
      />
      <div className="h-full  grid grid-cols-4 gap-4 overflow-y-auto custom-scrollbar">
        <ListScenesHistory/>
      </div>
    </>
  )
}

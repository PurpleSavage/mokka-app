import ButtonGenerateMultimediaContent from "@/modules/influencers/view/components/ButtonGenerateMultimediaContent";
import { OriginComponentOptions } from "@/modules/influencers/view/ui-types/multimedia-options";

export default function ScenesByInfluencerPage() {
  return (
    <div className="space-y-2">
      <ButtonGenerateMultimediaContent 
        text="Create Scene" 
        originComponent={OriginComponentOptions.scene}
      />
    </div>
  )
}

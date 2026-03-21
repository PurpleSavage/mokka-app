import ButtonGenerateMultimediaContent from "@/modules/influencers/view/components/ButtonGenerateMultimediaContent";
import { OriginComponentOptions } from "@/modules/influencers/view/ui-types/multimedia-options";

export default function SnpashotsByInfluencerPage() {
  return (
    <div className="space-y-2">
        <ButtonGenerateMultimediaContent 
          text="Create snapshot" 
          originComponent={OriginComponentOptions.snapshot}
        />
    </div>
  )
}

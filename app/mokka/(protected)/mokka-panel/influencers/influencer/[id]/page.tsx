import ButtonGenerateMultimediaContent from "@/modules/influencers/view/components/ButtonGenerateMultimediaContent";
import SnapshotsGalleryByInfluencer from "@/modules/influencers/view/components/SnapshotsGalleryByInfluencer";
import { OriginComponentOptions } from "@/modules/influencers/view/ui-types/multimedia-options";

export default function SnpashotsByInfluencerPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <div className="space-y-2">
      <ButtonGenerateMultimediaContent 
        text="Create snapshot" 
        originComponent={OriginComponentOptions.snapshot}
      />
      <SnapshotsGalleryByInfluencer params={params} />
    </div>
  )
}
